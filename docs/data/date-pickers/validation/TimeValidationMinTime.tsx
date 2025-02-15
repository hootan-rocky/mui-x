import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from 'docsx/src/modules/components/DemoContainer';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Unstable_NextTimePicker as NextTimePicker } from '@mui/x-date-pickers/NextTimePicker';
import { Unstable_NextDateTimePicker as NextDateTimePicker } from '@mui/x-date-pickers/NextDateTimePicker';

const fiveAM = dayjs().set('hour', 5).startOf('hour');
const nineAM = dayjs().set('hour', 9).startOf('hour');

export default function TimeValidationMinTime() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer>
        <DemoItem label="TimePicker">
          <NextTimePicker defaultValue={fiveAM} minTime={nineAM} />
        </DemoItem>
        <DemoItem label="DateTimePicker">
          <NextDateTimePicker defaultValue={fiveAM} minTime={nineAM} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
