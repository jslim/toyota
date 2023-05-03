import { Story } from '@storybook/react';

import RichtextWrapper, { RichtextWrapperProps } from './RichtextWrapper';

export default { title: 'components/RichtextWrapper' };

export const Default: Story<RichtextWrapperProps> = (args) => <RichtextWrapper {...args} />;

const paragraphMarkup = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada purus nec augue tempus, accumsan
    vehicula nisl faucibus. Aenean lacinia mattis elit, nec porttitor erat faucibus eget. Mauris vitae nisi venenatis,
    rutrum metus quis, euismod mi. Sed sed lectus sit amet leo dictum volutpat non eget leo.
  </p>
);

const tableMarkup = (
  <table>
    <tr>
      <th colSpan={2}>Categories of personal information collected</th>
      <th>Cookies Used</th>
    </tr>
    <tr>
      <td>Identifiers</td>
      <td>
        Includes direct identifiers, such as name, alias, user ID, username, account number or unique personal
        identifier; email address, phone number, address and other contact information; IP address and other online
        identifiers.
      </td>
      <td>
        Including, but not limited to, browsing history, clickstream data, search history, and information regarding
        interactions with an internet website, application, or advertisement, including other usage data related to your
        use of any of our Services or other online services.
      </td>
    </tr>
    <tr>
      <td>Identifiers</td>
      <td>
        Includes direct identifiers, such as name, alias, user ID, username, account number or unique personal
        identifier; email address, phone number, address and other contact information; IP address and other online
        identifiers.
      </td>
      <td>
        Including, but not limited to, browsing history, clickstream data, search history, and information regarding
        interactions with an internet website, application, or advertisement, including other usage data related to your
        use of any of our Services or other online services.
      </td>
    </tr>
  </table>
);
Default.args = {
  children: [paragraphMarkup, tableMarkup]
};

Default.argTypes = {};
