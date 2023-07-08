import { useEffect, useRef, useState } from 'react';
import Event from './Event';
import { TABS, TABS_KEYS } from './tabs';

export default function MainDevices() {
  const initedRef = useRef(false);
  const sumWidthRef = useRef(0);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (!activeTab && !initedRef.current) {
      initedRef.current = true;
      setActiveTab(new URLSearchParams(location.search).get('tab') || 'all');
    }
  }, [activeTab]);

  const onSelectInput = (event) => {
    sumWidthRef.current = 0;
    setActiveTab(event.target.value);
  };

  const onClick = (key) => {
    sumWidthRef.current = 0;
    setActiveTab(key);
  };

  return (
    <>
    <div className="section__title">
      <h2 className="section__title-header">Избранные устройства</h2>

      <select
        className="section__select"
        defaultValue="all"
        onInput={onSelectInput}
      >
        {TABS_KEYS.map((key) => (
          <option key={key} value={key}>
            {TABS[key].title}
          </option>
        ))}
      </select>

      <ul role="tablist" className="section__tabs">
        {TABS_KEYS.map((key) => (
          <li
            key={key}
            role="tab"
            aria-selected={key === activeTab ? 'true' : 'false'}
            tabIndex={key === activeTab ? '0' : undefined}
            className={
              'section__tab' + (key === activeTab ? ' section__tab_active' : '')
            }
            id={`tab_${key}`}
            aria-controls={`panel_${key}`}
            onClick={() => onClick(key)}
          >
            {TABS[key].title}
          </li>
        ))}
      </ul>
    </div>
      <TabPanel activeTab={activeTab} sumWidthRef={sumWidthRef} />
    </>
  );
}

function TabPanel({ activeTab, sumWidthRef }) {
  const ref = useRef();
  const [hasRightScroll, setHasRightScroll] = useState(false);

  const onSize = (width) => {
    sumWidthRef.current += width;
  };

  useEffect(() => {
    const newHasRightScroll = sumWidthRef.current > ref.current.offsetWidth;
    setHasRightScroll(newHasRightScroll);
  }, [activeTab]);

  const onArrowCLick = () => {
    const scroller = ref.current.querySelector(
      '.section__panel:not(.section__panel_hidden)'
    );
    if (scroller) {
      scroller.scrollTo({
        left: scroller.scrollLeft + 400,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className="section__panel-wrapper" ref={ref}>
      {TABS_KEYS.map((key) => (
        <div
          key={key}
          role="tabpanel"
          className={
            'section__panel' +
            (key === activeTab ? '' : ' section__panel_hidden')
          }
          aria-hidden={key === activeTab ? 'false' : 'true'}
          id={`panel_${key}`}
          aria-labelledby={`tab_${key}`}
        >
          <ul className="section__panel-list">
            {TABS[key].items.map((item, index) => (
              <Event key={index} {...item} onSize={onSize} />
            ))}
          </ul>
        </div>
      ))}
      {hasRightScroll && (
        <div className="section__arrow" onClick={onArrowCLick}></div>
      )}
    </div>
  );
}
