#!/bin/sh

  # -X POST \
  #  'https://api.trello.com/1/cards?idList=62fd0f9e9f5b0f3415179305' \

curl 'https://api.trello.com/1/cards/62fde449f6208200f8a5588f?fields=all' \
    -H "Authorization: OAuth oauth_consumer_key=\"$1\", oauth_token=\"$2\""
