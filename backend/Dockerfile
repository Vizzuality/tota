# Use the official Ruby image with version 3.1.0
FROM ruby:3.1.0

# Set environment variables for Rails
ENV RAILS_ENV=development
ENV RAILS_LOG_TO_STDOUT=true

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# Install dependencies
RUN  apt-get update -y && \
     apt-get upgrade -y && \
     apt-get install -y \
      build-essential \
      libpq-dev \
      nodejs \
      yarn

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock /usr/src/app/

# Install gems
RUN gem install bundler:2.4.5
RUN bundle install

# Install fe dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn install

# Copy the rest of the application code
COPY . /usr/src/app

# Expose port 3000
EXPOSE 4000

# Start Rails server
CMD ["rails", "server", "-p", "4000", "-b", "0.0.0.0"]