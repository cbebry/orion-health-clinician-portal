import React from 'react';

export interface NameDisplayPerson {
  title?: string;
  firstName: string;
  preferredName?: string;
  middleName?: string;
  familyName: string;
  suffix?: string;
}

export function NameDisplayConvention(props: NameDisplayPerson): JSX.Element {
  return (
    <span>
      {props.title} {props.preferredName ? (`${props.preferredName} (${props.firstName})`) : props.firstName} {props.middleName} {props.familyName} {props.suffix}
    </span>
  )
}
