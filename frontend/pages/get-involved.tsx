import Head from 'next/head';
import Image from 'next/image';
import { useMemo, useState, useCallback } from 'react';
import Layout from 'layout';
import cx from 'classnames';

import Loading from 'components/loading';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSaveContact } from 'hooks/contact';

import Hero from 'components/hero';
import Button from 'components/button';
import Input from 'components/forms/input';

import heroBackgroundImage from 'images/get-involved/hero-background.png';
import background1Image from 'images/get-involved/background1.png';
import background2Image from 'images/get-involved/background2.png';
import ParticipatingRegions from 'components/static-pages/participating-regions';

import { SUGGEST_STORY_FORM_URL, CONTRIBUTE_DATA_FORM_URL } from 'constants/links';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  message: yup.string().required(),
});

const GetInvolved: React.FC<void> = (): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState } = useForm({
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

  const refToInnerRef = (propsWithRef) => {
    const propsWithInnerRef = { ...propsWithRef, innerRef: propsWithRef.ref };
    delete propsWithInnerRef.ref;
    return propsWithInnerRef;
  };

  const emailInputProps = useMemo(() => refToInnerRef(register('email')), [register, refToInnerRef]);
  const messageInputProps = useMemo(() => refToInnerRef(register('message')), [register, refToInnerRef]);

  return (
    <Layout className="w-full">
      <Head>
        <title>Get involved | Tourism Impact Portal</title>
        <meta
          name="description"
          content="With the BC Tourism Impact Portal, the participating regions want to strengthen an open data culture, where information sharing and joint data efforts form the basis for better decision making and thus tourism planning overall. To ensure sustainable tourism development in the future, this is our collective responsibility."
        />
      </Head>

      <Hero
        image={heroBackgroundImage}
        title="Get involved"
        subtitle="With the BC Tourism Impact Portal, the participating regions want to strengthen an open data culture, where information sharing and joint data efforts form the basis for better decision making and thus tourism planning overall. To ensure sustainable tourism development in the future, this is our collective responsibility, so join the ride by contributing through the following ways:"
      />

      <div className="container mx-auto lg:px-16">
        <div className="grid md:grid-cols-2 gap-10 xl:gap-20 mt-20 text-center">
          <div className="p-10 xl:p-16 text-white relative" id="suggest-story">
            <Image src={background1Image} layout="fill" objectFit="cover" objectPosition="center" quality={100} />
            <div className="relative">
              <h2 className="text-2xl">Suggest a story</h2>
              <p className="leading-7 mt-10">
                See a connection or insight in the data worth exploring? Let us know about it. We might craft a story
                around the lead you sent in the future and extend insights thanks to those suggestions.
              </p>
              <Button theme="primary" className="mt-10 px-10 uppercase" href={SUGGEST_STORY_FORM_URL}>
                Suggest a Story
              </Button>
            </div>
          </div>
          <div className="p-10 xl:p-16 text-white relative" id="contribute-data">
            <Image src={background2Image} layout="fill" objectFit="cover" objectPosition="center" quality={100} />
            <div className="relative">
              <h2 className="text-2xl">Contribute data</h2>
              <p className="leading-7 mt-10">
                Join the open data revolution. We’re committed to making data freely accessible to everyone. If you want
                to help us on this journey and have data you can share (data you collected, or a data set you know of on
                another platform), we want to hear from you*.
              </p>

              <Button theme="primary" className="mt-10 px-10 uppercase" href={CONTRIBUTE_DATA_FORM_URL}>
                Submit/Propose a data set
              </Button>
              <p className="text-xs mt-6">
                *Note: The proposed data will be reviewed carefully. Its inclusion will depend on several factors such
                as the overall quality, completeness, reliability, relevance and timeliness, among others. Based on
                these factors, the participating regions will decide if the information will be included on the portal
                or not.
              </p>
            </div>
          </div>
        </div>

        <div className="text-blue-800 mt-10 xl:mt-20 py-24 px-10 text-center bg-white" id="feedback">
          <h2 className="text-4xl">Feedback & Questions</h2>

          <p className="mt-10 leading-7">
            Would you like to share some feedback or do you have any questions for us? Write us:
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            {submitting && (
              <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-orange-500/50">
                <Loading />
              </div>
            )}
            {success && (
              <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
                <h2 className="text-2xl font-black uppercase md:text-3xl font-display">Thank you</h2>
                <p className="text-xl font-light">We will be in touch soon.</p>
              </div>
            )}
            <div className="mt-10 flex flex-col gap-10 justify-center items-center">
              <div className="w-full" style={{ maxWidth: 500 }}>
                <Input
                  id="email"
                  mode="underlined"
                  placeholder="Enter your email"
                  {...emailInputProps}
                  className={cx({
                    'border-red-100': errors.email,
                  })}
                />
              </div>
              <div className="w-full" style={{ maxWidth: 500 }}>
                <Input
                  id="message"
                  mode="underlined"
                  placeholder="Enter your message"
                  {...messageInputProps}
                  className={cx({
                    'border-red-100': errors.message,
                  })}
                />
              </div>
              <Button type="submit" theme="secondary" className="w-48">
                Submit
              </Button>
            </div>
            {(errors?.email || errors?.message) && (
              <div className="text-red-100 pt-2">
                <p>{errors?.email?.message}</p>
                <p>{errors?.message?.message}</p>
              </div>
            )}
          </form>
        </div>

        <ParticipatingRegions />
      </div>
    </Layout>
  );
};

export default GetInvolved;
