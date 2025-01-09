'use client';

import '@/styles/NavAction.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function NavAction({variant, tooltipPlacement, tooltipText, onClick, children}){
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {tooltipText}
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement={tooltipPlacement}
            delay={{ show: 400, hide: 100 }}
            overlay={renderTooltip}
        >
            <Button className='nav-action' variant={variant} onClick={onClick}>{children}</Button>
        </OverlayTrigger>
    );
}