import React, { FC } from 'react';
import Button from 'components/button';
import Input from 'components/forms/input';
import cx from 'classnames';

export interface NewsletterSignUpProps {
  className?: string;
}

const NewsletterSignUp: FC<NewsletterSignUpProps> = ({ className }: NewsletterSignUpProps) => (
  <div className={cx('text-blue-800 py-24 text-center', { [className]: !!className })}>
    <div className="text-4xl">Want to receive updates on the platform?</div>

    <div className="mt-10 flex flex-row flex-wrap gap-10 xl:gap-16 justify-center">
      <div className="w-full" style={{ maxWidth: 400 }}>
        <Input mode="underlined" placeholder="Enter your email" />
      </div>
      <Button theme="secondary" className="w-48">
        Submit
      </Button>
    </div>
  </div>
);

export default NewsletterSignUp;
