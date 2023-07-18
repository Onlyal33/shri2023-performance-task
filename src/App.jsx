import { useEffect, useRef, useState } from 'react';
import Event from './Event';
import { TABS, TABS_KEYS } from './tabs';

export default function MainDevices() {
  const [activeTab, setActiveTab] = useState(new URLSearchParams(location.search).get('tab') || 'all');

  const onSelectInput = (event) => {
    setActiveTab(event.target.value);
  };

  const onClick = (key) => {
    setActiveTab(key);
  };

  return (
    <>
    <div className="section__title">
      <h2 className="section__title-header">Избранные устройства</h2>

      <select
        className="section__select"
        onInput={onSelectInput}
        value={activeTab}
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
      <TabPanel activeTab={activeTab} />
    </>
  );
}

function TabPanel({ activeTab }) {
  const ref = useRef([]);
  const refWrapper = useRef();
  const [hasRightScroll, setHasRightScroll] = useState(false);

  useEffect(() => {
    const newHasRightScroll = ref.current[activeTab].scrollWidth > ref.current[activeTab].offsetWidth;
    setHasRightScroll(newHasRightScroll);
  }, [activeTab]);

  const onArrowCLick = () => {
    const scroller = refWrapper.current.querySelector(
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
    <div className="section__panel-wrapper" ref={refWrapper}>
      {TABS_KEYS.map((key) => (
        <div
          ref={(el) => (ref.current[key] = el)}
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
              <Event key={index} {...item} />
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
