import React, { FC } from 'react';
import Button from 'components/button';
import Input from 'components/forms/input';
import cx from 'classnames';

export interface NewsletterSignUpProps {
  className?: string;
}

const NewsletterSignUp: FC<NewsletterSignUpProps> = ({ className }: NewsletterSignUpProps) => (
  <div className={cx('text-blue9 py-24 text-center', { [className]: !!className })}>
    <div className="text-4xl">Want to receive updates on the platform?</div>

    <div className="mt-10 flex flex-row flex-wrap gap-16 justify-center">
      <Input className="text-center h-full" mode="underlined" placeholder="Enter your email" />
      <Button theme="secondary" className="w-48">
        Submit
      </Button>
    </div>
  </div>
);

export default NewsletterSignUp;
