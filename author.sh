#!/bin/sh

# git filter-branch --env-filter '
# OLD_EMAIL="et@EnviroTchiesAir.verizon.net"
# CORRECT_NAME="Leslie Pajuelo"
# CORRECT_EMAIL="l.l.pajuelo@gmail.com"
# if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
# then
#     export GIT_COMMITTER_NAME="$CORRECT_NAME"
#     export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
# fi
# if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
# then
#     export GIT_AUTHOR_NAME="$CORRECT_NAME"
#     export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
# fi
# ' --tag-name-filter cat -- --branches --tags


git filter-repo --commit-callback '
  old_email = b"et@EnviroTchiesAir.verizon.net"
  correct_name = b"Leslie pajuelo"
  correct_email = b"l.l.pajuelo@gmail.com"
  
  if commit.committer_email == old_email :
    commit.committer_name = correct_name
    commit.committer_email = correct_email

  if commit.author_email == old_email : 
    commit.author_name = correct_name
    commit.author_email = correct_email
  ' --force