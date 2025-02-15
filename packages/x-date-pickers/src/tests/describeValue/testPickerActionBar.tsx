import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { screen, userEvent } from '@mui/monorepo/test/utils';
import { DescribeValueTestSuite } from './describeValue.types';

export const testPickerActionBar: DescribeValueTestSuite<any, 'new-picker'> = (
  ElementToTest,
  getOptions,
) => {
  const { componentFamily, render, values, emptyValue, setNewValue, variant, type } = getOptions();

  if (componentFamily !== 'new-picker') {
    return;
  }

  // No view to test
  if (variant === 'desktop' && type === 'time') {
    return;
  }

  describe('Picker action bar', () => {
    describe('clear action', () => {
      it('should call onClose, onChange with empty value and onAccept with empty value', () => {
        const onChange = spy();
        const onAccept = spy();
        const onClose = spy();

        render(
          <ElementToTest
            onChange={onChange}
            onAccept={onAccept}
            onClose={onClose}
            defaultValue={values[0]}
            open
            componentsProps={{ actionBar: { actions: ['clear'] } }}
          />,
        );

        // Clear the date
        userEvent.mousePress(screen.getByText(/clear/i));
        expect(onChange.callCount).to.equal(1);
        expect(onChange.lastCall.args[0]).to.equal(emptyValue);
        expect(onAccept.callCount).to.equal(1);
        expect(onAccept.lastCall.args[0]).to.equal(emptyValue);
        expect(onClose.callCount).to.equal(1);
      });

      it('should not call onChange or onAccept if the value is already empty value', () => {
        const onChange = spy();
        const onAccept = spy();
        const onClose = spy();

        render(
          <ElementToTest
            onChange={onChange}
            onAccept={onAccept}
            onClose={onClose}
            open
            componentsProps={{ actionBar: { actions: ['clear'] } }}
          />,
        );

        // Clear the date
        userEvent.mousePress(screen.getByText(/clear/i));
        expect(onChange.callCount).to.equal(0);
        expect(onAccept.callCount).to.equal(0);
        expect(onClose.callCount).to.equal(1);
      });
    });

    describe('cancel action', () => {
      it('should call onClose and onChange with the initial value', () => {
        const onChange = spy();
        const onAccept = spy();
        const onClose = spy();

        render(
          <ElementToTest
            onChange={onChange}
            onAccept={onAccept}
            onClose={onClose}
            open
            defaultValue={values[0]}
            componentsProps={{ actionBar: { actions: ['cancel'] } }}
            closeOnSelect={false}
          />,
        );

        // Change the value (already tested)
        setNewValue(values[0], { isOpened: true });

        // Cancel the modifications
        userEvent.mousePress(screen.getByText(/cancel/i));
        expect(onChange.callCount).to.equal(2);
        // TODO: Support range
        expect(onChange.lastCall.args[0]).toEqualDateTime(values[0] as any);
        expect(onAccept.callCount).to.equal(0);
        expect(onClose.callCount).to.equal(1);
      });

      it('should not call onChange if no prior value modification', () => {
        const onChange = spy();
        const onAccept = spy();
        const onClose = spy();

        render(
          <ElementToTest
            onChange={onChange}
            onAccept={onAccept}
            onClose={onClose}
            open
            defaultValue={values[0]}
            componentsProps={{ actionBar: { actions: ['cancel'] } }}
            closeOnSelect={false}
          />,
        );

        // Cancel the modifications
        userEvent.mousePress(screen.getByText(/cancel/i));
        expect(onChange.callCount).to.equal(0);
        expect(onAccept.callCount).to.equal(0);
        expect(onClose.callCount).to.equal(1);
      });
    });

    describe('confirm action', () => {
      it('should call onClose and onAccept with the live value', () => {
        const onChange = spy();
        const onAccept = spy();
        const onClose = spy();

        render(
          <ElementToTest
            onChange={onChange}
            onAccept={onAccept}
            onClose={onClose}
            open
            defaultValue={values[0]}
            componentsProps={{ actionBar: { actions: ['accept'] } }}
            closeOnSelect={false}
          />,
        );

        // Change the value (already tested)
        setNewValue(values[0], { isOpened: true });

        // Accept the modifications
        userEvent.mousePress(screen.getByText(/ok/i));
        expect(onChange.callCount).to.equal(1); // The accepted value as already been committed, don't call onChange again
        expect(onAccept.callCount).to.equal(1);
        expect(onClose.callCount).to.equal(1);
      });
    });
  });
};
