import React, { FC } from 'react';
import LinkButton from 'components/button';
import cx from 'classnames';

import { SUGGEST_STORY_FORM_URL, CONTRIBUTE_DATA_FORM_URL } from 'constants/links';

export interface GetInvolvedProps {
  className?: string;
}

const GetInvolved: FC<GetInvolvedProps> = ({ className }: GetInvolvedProps) => (
  <div className={cx('text-blue-800 py-24 text-center', { [className]: !!className })}>
    <div className="text-4xl">Get involved</div>

    <div className="mt-10 flex flex-row flex-wrap gap-8 justify-center">
      <LinkButton theme="blue" className="w-60" href={SUGGEST_STORY_FORM_URL}>
        Suggest a story
      </LinkButton>
      <LinkButton theme="blue" className="w-60" href={CONTRIBUTE_DATA_FORM_URL}>
        Contribute Data
      </LinkButton>
      <LinkButton theme="blue" className="w-60" href="/feedback-questions">
        Feedback & Questions
      </LinkButton>
    </div>
  </div>
);

export default GetInvolved;
