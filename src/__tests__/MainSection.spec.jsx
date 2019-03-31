import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainSection, {
  HeroSection,
  HowToSection,
  FeaturedSection
} from '../components/MainSection.jsx';

configure({ adapter: new Adapter() });

describe('Hero component should be rendered', () => {
  const heroComponent = shallow(<HeroSection />);

  it('should contain a hero section', () => {
    expect(heroComponent.find('section.hero').exists()).toBe(true);
  });

  it('should ensure hero section contains a cta', () => {
    expect(heroComponent.find('section.hero > .hero-cta').exists()).toBe(true);
  });
});

describe('HowTo section component should be rendered', () => {
  const heroComponent = shallow(<HowToSection />);

  it('should contain a how-to section', () => {
    expect(heroComponent.find('section.how-to').exists()).toBe(true);
  });

  it('should ensure how-to section contains features section', () => {
    expect(heroComponent.find('.features > .feature-item').length).toBe(3);
  });
});

describe('Featured section component should be rendered', () => {
  const heroComponent = shallow(<FeaturedSection />);

  it('should contain a featured section', () => {
    expect(heroComponent.find('section.featured').exists()).toBe(true);
  });

  it('should ensure featured section contains features section', () => {
    expect(heroComponent.find('.features > .feature-item').length).toBe(3);
  });
});

describe('MainSection component should be rendered', () => {
  const mainSectionComponent = shallow(<MainSection />);

  it('should contain a hero section', () => {
    expect(mainSectionComponent.find('main').exists()).toBe(true);
  });
});
