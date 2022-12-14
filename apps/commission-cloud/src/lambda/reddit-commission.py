import requests as req
from dotenv import load_dotenv
import os

agent = 'script:commission-bot:0.0.1 (by /u/kumi_yada)'


class RedditPost:
    def __init__(self, title='', text='', images=[], subreddit='', flair='') -> None:
        self.title = title
        self.text = text
        self.images = images
        self.subreddit = subreddit
        self.flair = flair


class RedditClient:
    asset_url = 'https://reddit-uploaded-media.s3-accelerate.amazonaws.com'

    def __init__(self, token: str, user_agent=agent):
        self.baseURL = 'https://oauth.reddit.com'
        self.headers = {
            'Authorization': f'Bearer {token}',
            'User-Agent': user_agent,
        }

    def submit_post(self, post: RedditPost):
        print(f'----- Start submitting to {post.subreddit} ------')

        image_ids = [self._upload_image(i) for i in post.images]
        post_id = self._post_to_subreddit(image_ids, post)

        if post_id and len(image_ids) > 0 and post.text:
            self._add_comment(post_id, post.text)

        print(f'----- Submit finished -----')
        return post_id

    def _return_data_if_no_error(self, res):
        res.raise_for_status()

        data = res.json()
        if 'json' in data:
            json = res.json()['json']
            errors = json['errors']
            if len(errors) > 0:
                print(errors)
                raise Exception(errors)

            return json['data']
        return None

    def _add_comment(self, post_id: str, text: str):
        body = {
            'text': text,
            'thing_id': post_id,
        }
        res = req.post(self.baseURL + '/api/comment?api_type=json',
                       body, headers=self.headers)
        data = self._return_data_if_no_error(res)
        print(f'Added comment to post {post_id}: {text}')

        return data['things'][0]['data']['id']

    def _upload_image(self, imageUrl: str):
        filename = imageUrl.split('/')[-1]
        data = {
            'filepath': filename,
            'mimetype': f"image/{filename.split('.')[-1]}",
        }

        res = req.post(self.baseURL + '/api/media/asset.json',
                       data=data, headers=self.headers)
        self._return_data_if_no_error(res)

        asset_data = res.json()
        self._upload_image_action_to_s3(imageUrl, asset_data['args'])

        asset_id = asset_data['asset']['asset_id']
        print('Uploaded {} with id {}'.format(imageUrl, asset_id))
        return asset_id

    def _upload_image_action_to_s3(self, imageUrl: str, args: dict):
        full_url = 'https:{}'.format(args['action'])

        upload_data = {item["name"]: item["value"]
                       for item in args["fields"]}

        image_res = req.get(imageUrl)
        image_res.raise_for_status()

        res = req.post(full_url, data=upload_data,
                       files={"file": image_res.content})
        res.raise_for_status()

    def _post_to_subreddit(self, image_ids, post: RedditPost):
        body = {
            'sr': post.subreddit,
            'title': post.title,
            'sendreplies': True,
        }

        self._apply_flair_to_body(body, post)

        if len(image_ids) > 1:
            return self._submit_gallery_post(body, image_ids)
        else:
            return self._submit_single_post(body, image_ids, post)

    def _apply_flair_to_body(self, body: dict, post: RedditPost):
        if post.flair:
            flair_id, flair_text = self._find_flair(post.subreddit, post.flair)
            if flair_id:
                body['flair_id'] = flair_id
                body['flair_text'] = flair_text
            else:
                raise Exception(f'Failed to find flair {post.flair}')

    def _find_flair(self, sr: str, text: str):
        if text:
            print(f'Searching for flair: {text}')
            res = req.get(f'{self.baseURL}/r/{sr}/api/link_flair',
                          headers=self.headers)
            res.raise_for_status()
            data = res.json()

            for flair in data:
                flair_text = flair['text']
                if text.lower() in flair_text.lower():
                    return flair['id'], flair_text

        return None, None

    def _submit_gallery_post(self, body: dict, image_ids):
        body['kind'] = 'self'
        body['items'] = [{'media_id': i, 'caption': '',
                          'outbound_url': ''} for i in image_ids]
        res = req.post(
            self.baseURL + '/api/submit_gallery_post.json?api_type=json', json=body, headers=self.headers)

        data = self._return_data_if_no_error(res)
        return data['id']

    def _submit_single_post(self, body: dict, image_ids, post: RedditPost):
        if len(image_ids) > 0:
            body['kind'] = 'image'
            body['url'] = f'{self.asset_url}/rte_images/{image_ids[0]}',
        else:
            body['kind'] = 'self'
            body['text'] = post.text

        res = req.post(self.baseURL + '/api/submit?api_type=json',
                       body, headers=self.headers)
        data = self._return_data_if_no_error(res)

        if 'url' in data:
            return data['name']

        return None



# Needed locally
# load_dotenv()

def handler():
  res = req.post('https://www.reddit.com/api/v1/access_token',
                headers={'User-Agent': agent},
                data={'grant_type': 'password', 'username': os.getenv(
                    'REDDIT_USER'), 'password': os.getenv('REDDIT_PASSWORD')},
                auth=(os.getenv('REDDIT_CLIENT'), os.getenv('REDDIT_SECRET')))
  res.raise_for_status()
  token = res.json()['access_token']

  client = RedditClient(token)

  images = ['https://i.redd.it/wkt7r87nnsz91.png',
            'https://i.redd.it/wkt7r87nnsz91.png']
  title = '[FOR HIRE] Anime Illustrations starting at ~50€'

  commission_post = RedditPost(title=title,
                              images=images,
                              subreddit='commissions',
                              flair='FOR HIRE')
  client.submit_post(commission_post)

  art_commission_post = RedditPost(title=title,
                                  images=images,
                                  subreddit='art_commissions',
                                  flair='Artist')
  client.submit_post(art_commission_post)
