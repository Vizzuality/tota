import { Story } from '@storybook/react/types-6-0';
import Expando from './component';
import { ExpandoProps } from './types';

export default {
  title: 'Components/Expando',
  component: Expando,
};

const Template: Story<ExpandoProps> = ({ children, ...args }: ExpandoProps) => <Expando {...args}>{children}</Expando>;

export const Default = Template.bind({});
Default.args = {
  title: 'Expando title',
  children: <div>Example content</div>,
  disabled: false,
};
