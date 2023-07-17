import cx from 'classnames';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useSaveContact } from 'hooks/newsletter';

import Loading from 'components/loading';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const Contact: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      email: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const saveContactMutation = useSaveContact({});

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

  return (
    <section className="bg-white">
      <div className="relative z-10">
        <form onSubmit={handleSubmit(onSubmit)} className="relative p-10 space-y-10 bg-orange-500 md:p-20">
          {submitting && (
            <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-orange-500/50">
              <Loading />
            </div>
          )}

          {success && (
            <div className="absolute top-0 left-0 z-20 flex flex-col items-center justify-center w-full h-full py-20 space-y-5 bg-orange-500 xl:px-20">
              <h2 className="text-4xl font-black uppercase md:text-6xl font-display">Thank you</h2>
              <p className="text-xl font-light">We will be in touch soon.</p>

              <div>
                <button
                  type="button"
                  className="py-8 mt-5 font-semibold text-black bg-transparent border border-black px-14 hover:bg-black/10"
                  onClick={() => {
                    reset();
                    setSuccess(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col items-end justify-between space-y-10 md:flex-row md:space-x-10 md:space-y-0">
            <div className="w-full">
              <label htmlFor="email" className="font-bold ">
                Email address
              </label>
              <input
                id="email"
                className={cx({
                  'block w-full py-5 bg-transparent border-b-2 border-black/20 placeholder:text-black/30 focus:outline-none':
                    true,
                  'border-red-100': errors.email,
                })}
                placeholder="name@company.com"
                {...register('email')}
              />
            </div>
          </div>
          <div className="flex flex-col items-end justify-between space-y-10 md:flex-row md:space-x-10 md:space-y-0">
            <div className="w-full">
              <label htmlFor="message" className="font-bold ">
                Message
              </label>
              <textarea
                id="message"
                className={cx({
                  'block w-full py-5 px-0 bg-transparent appearance-none border-t-transparent border-l-transparent border-r-transparent border-b-2 border-b-black/20 placeholder:text-black/30 focus:outline-none':
                    true,
                  'border-red-100': errors.message,
                })}
                rows={4}
                placeholder="Write your message..."
                {...register('message')}
              />
            </div>
          </div>
          <div className="justify-self-end">
            <button
              type="submit"
              className="py-8 px-10 max-h-44 font-semibold text-black bg-transparent border-2 border-black hover:bg-black/10"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
