import { Story } from '@storybook/react';

import ColumnsText, { ColumnsTextProps } from './ColumnsText';
import { ColumnType } from '@/data/variants';
import sanitizer from '@/utils/sanitizer';
import { useLayout } from '@/hooks';
import Cta from '../Cta/Cta';
import css from './ColumnsText.module.scss';

export default { title: 'components/ColumnsText' };

export const ColumnsHalfHalf: Story<ColumnsTextProps> = (args) => (
  <ColumnsText
    {...args}
    leftSide={
      <div
        className={css.title}
        style={{ marginBottom: '26px' }}
        dangerouslySetInnerHTML={{ __html: sanitizer(ColumnsHalfHalfContent.title) }}
      />
    }
  >
    <div className={css.text} dangerouslySetInnerHTML={{ __html: sanitizer(ColumnsHalfHalfContent.text) }} />
  </ColumnsText>
);

const ColumnsHalfHalfContent = {
  title:
    '<h4>Dr. James Kuffner is the Chief Executive Officer (CEO) and Representative Director of Woven Planet, and a Member of the Board of Directors and Operating Officer of Toyota Motor Corporation (TMC).</h4><h4>Dr. Kuffner also serves as the Representative Director of Woven Core, and the President and Representative Director of Woven Alpha. He has also been serving as Chief Digital Officer of TMC.</h4>',
  text: '<p>As CEO of Woven Planet, he is driven to strengthen the business and technology vision for Woven Planet and deliver on the promise of safe mobility available to all.</p><p>Dr. Kuffner received a Ph.D. from the Stanford University Dept. of Computer Science Robotics Laboratory in 2000, and was a Japan Society for the Promotion of Science (JSPS) Postdoctoral Research Fellow at the University of Tokyo working on software and planning algorithms for humanoid robots. He joined the faculty at Carnegie Mellon University\'s Robotics Institute in 2002.</p> <p>Dr. Kuffner is best known as a co-inventor of the Rapidly-exploring Random Tree (RRT) algorithm, which has become a key standard benchmark for robot motion planning. He has published over 125 technical papers, holds more than 50 patents, and received the Okawa Foundation Award for Young Researchers in 2007.</p><p>Dr. Kuffner was a Research Scientist and Engineering Director at Google from 2009 to 2016. He was part of the initial engineering team that built Google’s self-driving car. In 2010, he introduced the term "Cloud Robotics" to describe how network-connected robots could take advantage of distributed computation and data stored in the cloud. He was appointed head of Google’s Robotics division in 2014. He Joined the Toyota Research Institute (TRI) as CTO in 2016. Dr. Kuffner continues to serve as an Adjunct Associate Professor at the Robotics Institute, Carnegie Mellon University, and as an Executive Advisor to TRI.</p>'
};

export const Columns30_70: Story<ColumnsTextProps> = (args) => {
  const { layout } = useLayout();
  const leftSideContent = !layout.mobile && (
    <div style={{ position: 'sticky', top: '100px' }}>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizer(Columns30_70Content.title) }}
        style={{ marginBottom: '26px' }}
      />
      <Cta {...Columns30_70Content.cta} />
    </div>
  );
  return (
    <div style={{ paddingTop: '200px' }}>
      <ColumnsText {...args} theme={ColumnType.Columns_30_70} leftSide={leftSideContent}>
        <div
          style={{ marginBottom: '26px' }}
          dangerouslySetInnerHTML={{ __html: sanitizer(Columns30_70Content.text) }}
        />
        {layout.mobile && <Cta {...Columns30_70Content.cta} />}
      </ColumnsText>
    </div>
  );
};

const Columns30_70Content = {
  title: 'CI/CD Automation <br/> / DevOps Engineer',
  text: '<div><a href="https://www.woven-planet.global/en" class="postings-link">Woven by Toyota</a> is building mobility for a safer, happier and more sustainable world. A subsidiary of Toyota, Woven by Toyota develops and invests in new technologies, software, and business models that transform how we live, work and move. With a focus on software-defined vehicles, automated driving, data-driven intelligence, security, mobility services, embedded platforms, AI, and more, we build on Toyota\'s legacy of trust and safety to deliver mobility solutions for all. </div><div><br></div><div>For nearly a century, Toyota has been delivering products and services that improve lives. Its earliest offerings, which automated the simple manual task of weaving, have evolved into the safe, reliable, connected automobiles we enjoy and depend on today. Woven by Toyota is an integral part of Toyota’s vision for the next 100 years—a world where mobility is easier, safer and more enjoyable for more people. </div><div><br></div><div>Our unique global culture weaves modern Silicon Valley innovation and time-tested Japanese quality craftsmanship and operational excellence. These complementary strengths enable us to develop and deliver cutting-edge technology at scale—optimizing for safety, advancing clean energy and elevating well-being.&nbsp; We envision a human-centered future where world-class technology solutions expand global access to mobility, amplify the capabilities of drivers, and empower humanity to thrive.</div><div><br></div><div><b style="font-size: 18px">EQUAL OPPORTUNITY AND DIVERSITY</b></div><div>Woven City is committed to creating a diverse and inclusive workplace, where everyone is valued and respected. We are an equal opportunity employer.</div><div><br></div><div><b style="font-size: 18px">CITYOS PLATFORM TEAM</b></div><div>Toyota’s Woven City is a fully connected ecosystem powered by hydrogen fuel cells to be built at the base of Mt. Fuji in Japan. It is envisioned as a ‘living laboratory’ and ‘ever evolving’, incorporating a diversity of cutting edge technologies. It will be the world’s most programmable city. At the same time, it is also ‘human-centric’, serving the needs of its citizens and keeping people safe, comfortable and happy.</div><div><br></div><div>Our mission is to create the digital heart of Woven City: a software platform called “CityOS”. All digitally connected services in the city will be orchestrated and delivered on this platform. The technical challenge is huge, and includes creating state of the art systems for collaborating microservices, identity, authentication, privacy, security, data broking, IoT control, and much more. The platform will be open to third party inventors who will collaborate with us to unlock the potential of the world’s smartest city.</div><div><br></div><div>In particular, the IoT team is responsible for building services and flows to manage IoT devices through their entire lifecycle. We empower inventors to deliver on their mission with modern technologies exploring new paradigms.</div><div><br></div><div>For more information about Woven City, please visit: <a href="https://www.woven-city.global/" class="postings-link">https://www.woven-city.global/</a></div><div><br></div><div><b style="font-size: 18px">WHO ARE WE LOOKING FOR?</b></div><div>We are hiring Senior Engineers for individual contributor and team lead roles based in Tokyo. These roles report to a City OS Team Lead or Manager, focusing on building a set of services within the platform. It is a highly technical team of software engineers.</div><div><br></div><div>Are you passionate about technology and how it can transform the world into a better place? Are you looking for a role where you can make an enormous impact on the future by empowering other engineers to build secure systems at a scale?</div><div><br></div>',
  isSticky: true,
  cta: { href: '/', title: 'apply for this job' }
};

Columns30_70.args = {
  isSticky: true,
  eyebrow: { text: 'eyebrow' }
};

export const BlogText: Story<ColumnsTextProps> = (args) => (
  <ColumnsText
    {...args}
    theme={ColumnType.Columns_30_70}
    leftSide={<div dangerouslySetInnerHTML={{ __html: sanitizer(BlogTextContent.title) }} />}
  >
    <div dangerouslySetInnerHTML={{ __html: sanitizer(BlogTextContent.text) }} />
  </ColumnsText>
);

const BlogTextContent = {
  title: 'Some title',
  text: '<div><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada purus nec augue tempus, accumsan vehicula nisl faucibus. Aenean lacinia mattis elit, nec porttitor erat faucibus eget. Mauris vitae nisi venenatis, rutrum metus quis, euismod mi. Sed sed lectus sit amet leo dictum volutpat non eget leo.</div><br><div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada purus nec augue tempus, accumsan vehicula nisl faucibus. Aenean lacinia mattis elit, nec porttitor erat faucibus eget. Mauris vitae nisi venenatis, rutrum metus quis, euismod mi. Sed sed lectus sit amet leo dictum volutpat non eget leo.</div></div>'
};
BlogText.args = {
  eyebrow: { text: 'eyebrow' }
};
