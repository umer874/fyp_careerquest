"use client";
import CustomCalendar from "components/common/customCalendar";
import React from "react";
import { Views } from "react-big-calendar";

interface CalenderViewProps {
  events: any[];
}

const CalenderView = ({ events }: CalenderViewProps) => {
  return (
    <CustomCalendar defaultView={Views.MONTH} height={700} events={events} />
  );
};

export default CalenderView;
