import { getDeviceString } from '../lib/utils';
import chai from 'chai';


chai.should();

describe.only('getDeviceString', () => {
  const xcodes = [6, 7];
  const sdks = ['8.0', '9.0'];

  function checkDevice (xcode, sdk, deviceString) {
    if (xcode.major === 6) {
      deviceString.should.include(`(${sdk} Simulator)`);
    } else {
      deviceString.should.include(`(${sdk})`);
    }
  }

  for (let xcode of xcodes) {
    xcode = {major: xcode};
    for (let sdk of sdks) {
      it('should respect forceIphone', () => {
        let device = getDeviceString(xcode, sdk, {forceIphone: true});
        device.should.include('iPhone');
        checkDevice(xcode, sdk, device);
      });
      it('should respect forceIpad', () => {
        let device = getDeviceString(xcode, sdk, {forceIpad: true});
        device.should.include('iPad');
        checkDevice(xcode, sdk, device);
      });
      it('should respect platformVersion', () => {
        let device = getDeviceString(xcode, sdk, {platformVersion: '8.5'});
        checkDevice(xcode, '8.5', device);
      });
      it('should respect iosSdkVersion if no platformVersion given', () => {
        let device = getDeviceString(xcode, sdk);
        checkDevice(xcode, sdk, device);
      });
      it('should respect deviceName', () => {
        let deviceName = 'iPhone 12';
        let device = getDeviceString(xcode, sdk, {deviceName});
        checkDevice(xcode, sdk, device);
      });
      it('should respect exact deviceName', () => {
        let deviceName = 'iPhone 12';
        let device = getDeviceString(xcode, sdk, {deviceName: `=${deviceName}`});
        device.should.equal(deviceName);
      });
    }
  }
  getDeviceString;
});
