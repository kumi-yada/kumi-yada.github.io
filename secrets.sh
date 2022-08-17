aws ssm put-parameter --name "trello_key" --value "$1" --type SecureString
aws ssm put-parameter --name "trello_token" --value "$2" --type SecureString
