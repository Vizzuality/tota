import React, { FC, useMemo } from 'react';
import Button from 'components/button';
import Input from 'components/forms/input';
import cx from 'classnames';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useSaveNewsletter } from 'hooks/newsletter';

import Loading from 'components/loading';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export interface NewsletterSignUpProps {
  className?: string;
}

const NewsletterSignUp: FC<NewsletterSignUpProps> = ({ className }: NewsletterSignUpProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const saveContactMutation = useSaveNewsletter({});

  const onSubmit = useCallback(
    (data) => {
      setSubmitting(true);
      saveContactMutation.mutate(
        { data },
        {
          onSuccess: () => {
            setSubmitting(false);
            setSuccess(true);
          },
          onError: () => {
            setSubmitting(false);
          },
        },
      );
    },
    [saveContactMutation],
  );
  const inputProps = useMemo(() => {
    const propsWithInnerRef = { ...register('email'), innerRef: register('email').ref };
    delete propsWithInnerRef.ref;
    return propsWithInnerRef;
  }, [register]);

  return (
    <div className={cx('text-blue-800 py-24 text-center', { [className]: !!className })}>
      <div className="text-4xl">Want to receive updates on the platform?</div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative p-10 space-y-10 md:p-20">
        {submitting && (
          <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-orange-500/50">
            <Loading />
          </div>
        )}
        {success && (
          <div className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center w-full h-full py-20 space-y-5 bg-orange-500 xl:px-20">
            <h2 className="text-4xl font-black uppercase md:text-6xl font-display">Thank you</h2>
            <p className="text-xl font-light">We will be in touch soon.</p>
          </div>
        )}
        <div className="mt-10 flex flex-row flex-wrap gap-10 xl:gap-16 justify-center">
          <div className="w-full" style={{ maxWidth: 400 }}>
            <Input
              mode="underlined"
              id="email"
              className={cx({
                'border-red-100': errors.email,
              })}
              placeholder="Enter your email"
              {...inputProps}
            />
          </div>
          <Button type="submit" theme="secondary" className="w-48">
            Submit
          </Button>
        </div>
        {errors?.email && <div className="text-red-100">{errors.email.message}</div>}
      </form>
    </div>
  );
};

export default NewsletterSignUp;
