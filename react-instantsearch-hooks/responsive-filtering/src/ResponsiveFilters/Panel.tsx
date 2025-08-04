import React from 'react';

type PanelProps = React.PropsWithChildren<{
  header: string;
  collapsible?: boolean;
  collapsedByDefault?: boolean;
}>;

export function Panel({
  header,
  collapsible = false,
  collapsedByDefault = false,
  children,
}: PanelProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsedByDefault);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`ais-Panel ${collapsible ? 'ais-Panel--collapsible' : ''}`}>
      <div className="ais-Panel-header" onClick={toggleCollapse}>
        <span>{header}</span>
        {collapsible && (
          <button
            className="ais-Panel-collapseButton"
            aria-expanded={isCollapsed}
            onClick={toggleCollapse}
          >
            <span>
              <svg
                className="ais-Panel-collapseIcon"
                width="1em"
                height="1em"
                viewBox="0 0 500 500"
              >
                <path d="M250 400l150-300H100z" fill="currentColor"></path>
              </svg>
            </span>
          </button>
        )}
      </div>
      {!isCollapsed && <div className="ais-Panel-body">{children}</div>}
    </div>
  );
}
