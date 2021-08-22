import React, { FC } from 'react';
import LinkButton from 'components/button';
import cx from 'classnames';

export interface GetInvoledProps {
  className?: string;
}

const GetInvoled: FC<GetInvoledProps> = ({ className }: GetInvoledProps) => (
  <div className={cx('text-blue9 py-24 text-center border-b border-gray3', { [className]: !!className })}>
    <div className="text-4xl">Get involved</div>

    <div className="mt-10 flex flex-row flex-wrap gap-8 justify-center">
      <LinkButton theme="primary" className="w-60" href="/suggest-story">
        Suggest a story
      </LinkButton>
      <LinkButton theme="primary" className="w-60" href="/contribute-data">
        Contribute Data
      </LinkButton>
      <LinkButton theme="primary" className="w-60" href="/feedback-questions">
        Feedback & Questions
      </LinkButton>
    </div>
  </div>
);

export default GetInvoled;
