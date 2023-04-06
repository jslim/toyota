import { Story } from '@storybook/react';

import BiographyText, { BiographyTextProps } from './BiographyText';

export default { title: 'components/BiographyText' };

export const Default: Story<BiographyTextProps> = (args) => <BiographyText {...args} />;

const titles = [
  'Dr. James Kuffner is the Chief Executive Officer (CEO) and Representative Director of Woven Planet, and a Member of the Board of Directors and Operating Officer of Toyota Motor Corporation (TMC).',

  'Dr. Kuffner also serves as the Representative Director of Woven Core, and the President and Representative Director of Woven Alpha. He has also been serving as Chief Digital Officer of TMC.'
];

const texts = [
  'As CEO of Woven Planet, he is driven to strengthen the business and technology vision for Woven Planet and deliver on the promise of safe mobility available to all.',

  "Dr. Kuffner received a Ph.D. from the Stanford University Dept. of Computer Science Robotics Laboratory in 2000, and was a Japan Society for the Promotion of Science (JSPS) Postdoctoral Research Fellow at the University of Tokyo working on software and planning algorithms for humanoid robots. He joined the faculty at Carnegie Mellon University's Robotics Institute in 2002.",

  'Dr. Kuffner is best known as a co-inventor of the Rapidly-exploring Random Tree (RRT) algorithm, which has become a key standard benchmark for robot motion planning. He has published over 125 technical papers, holds more than 50 patents, and received the Okawa Foundation Award for Young Researchers in 2007.',

  'Dr. Kuffner was a Research Scientist and Engineering Director at Google from 2009 to 2016. He was part of the initial engineering team that built Google’s self-driving car. In 2010, he introduced the term "Cloud Robotics" to describe how network-connected robots could take advantage of distributed computation and data stored in the cloud. He was appointed head of Google’s Robotics division in 2014. He Joined the Toyota Research Institute (TRI) as CTO in 2016. Dr. Kuffner continues to serve as an Adjunct Associate Professor at the Robotics Institute, Carnegie Mellon University, and as an Executive Advisor to TRI.'
];

Default.args = {
  titles,
  texts
};

Default.argTypes = {};
