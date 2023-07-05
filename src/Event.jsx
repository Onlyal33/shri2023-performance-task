/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function Event(props) {
  const ref = useRef();

  const { onSize } = props;

  useEffect(() => {
      if (onSize) {
          onSize(ref.current.offsetWidth);
      }
  });

  return <li ref={ref} className={'event' + (props.slim ? ' event_slim' : '')}>
      <button className="event__button">
          <span className={`event__icon event__icon_${props.icon}`} role="img" aria-label={props.iconLabel}></span>
          <h4 className="event__title">{props.title}</h4>
          {props.subtitle &&
              <span className="event__subtitle">{props.subtitle}</span>
          }
      </button>
  </li>;
}