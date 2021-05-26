server 'ec2-52-90-59-21.compute-1.amazonaws.com', user: 'ubuntu', roles: %w{web app db}, primary: true
set :ssh_options, forward_agent: true

append :linked_files, 'config/credentials/production.key'

set :branch, ENV.fetch('DEPLOY_BRANCH') { 'main' }
