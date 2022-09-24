import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});