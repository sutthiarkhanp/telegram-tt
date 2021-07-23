import { RefObject } from 'react';
import React, { FC, useRef, useCallback } from '../../lib/teact/teact';

import { IS_TOUCH_ENV } from '../../util/environment';
import { fastRaf } from '../../util/schedulers';
import buildClassName from '../../util/buildClassName';
import useContextMenuHandlers from '../../hooks/useContextMenuHandlers';
import useContextMenuPosition from '../../hooks/useContextMenuPosition';
import useFlag from '../../hooks/useFlag';
import useLang from '../../hooks/useLang';

import RippleEffect from './RippleEffect';
import Menu from './Menu';
import MenuItem from './MenuItem';

import './ListItem.scss';

type OnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => void;

type MenuItemContextAction = {
  title: string;
  icon: string;
  destructive?: boolean;
  handler?: () => void;
};

type OwnProps = {
  ref?: RefObject<HTMLDivElement>;
  buttonRef?: RefObject<HTMLDivElement>;
  icon?: string;
  className?: string;
  style?: string;
  children: any;
  disabled?: boolean;
  ripple?: boolean;
  narrow?: boolean;
  inactive?: boolean;
  focus?: boolean;
  destructive?: boolean;
  multiline?: boolean;
  isStatic?: boolean;
  contextActions?: MenuItemContextAction[];
  onClick?: OnClickHandler;
};

const ListItem: FC<OwnProps> = (props) => {
  const {
    ref,
    buttonRef,
    icon,
    className,
    style,
    children,
    disabled,
    ripple,
    narrow,
    inactive,
    focus,
    destructive,
    multiline,
    isStatic,
    contextActions,
    onClick,
  } = props;

  // eslint-disable-next-line no-null/no-null
  let containerRef = useRef<HTMLDivElement>(null);
  if (ref) {
    containerRef = ref;
  }
  const [isTouched, markIsTouched, unmarkIsTouched] = useFlag();

  const {
    isContextMenuOpen, contextMenuPosition,
    handleBeforeContextMenu, handleContextMenu,
    handleContextMenuClose, handleContextMenuHide,
  } = useContextMenuHandlers(containerRef, !contextActions);

  const getTriggerElement = useCallback(() => containerRef.current, []);

  const getRootElement = useCallback(
    () => containerRef.current!.closest('.custom-scroll'),
    [],
  );

  const getMenuElement = useCallback(
    () => containerRef.current!.querySelector('.ListItem-context-menu .bubble'),
    [],
  );

  const { positionX, positionY, style: menuStyle } = useContextMenuPosition(
    contextMenuPosition,
    getTriggerElement,
    getRootElement,
    getMenuElement,
  );

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled || !onClick) {
      return;
    }
    onClick(e);

    if (IS_TOUCH_ENV && !ripple) {
      markIsTouched();
      fastRaf(unmarkIsTouched);
    }
  }, [disabled, markIsTouched, onClick, ripple, unmarkIsTouched]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (inactive || IS_TOUCH_ENV) {
      return;
    }
    if (contextActions && (e.button === 2 || !onClick)) {
      handleBeforeContextMenu(e);
    }
    if (e.button === 0) {
      if (!onClick) {
        handleContextMenu(e);
      } else {
        handleClick(e);
      }
    }
  }, [inactive, contextActions, onClick, handleBeforeContextMenu, handleContextMenu, handleClick]);

  const lang = useLang();

  const fullClassName = buildClassName(
    'ListItem',
    className,
    !isStatic && 'no-selection',
    ripple && 'has-ripple',
    narrow && 'narrow',
    disabled && 'disabled',
    inactive && 'inactive',
    contextMenuPosition && 'has-menu-open',
    focus && 'focus',
    destructive && 'destructive',
    multiline && 'multiline',
    isStatic && 'is-static',
  );

  return (
    <div
      ref={containerRef}
      className={fullClassName}
      dir={lang.isRtl ? 'rtl' : undefined}
      // @ts-ignore
      style={style}
    >
      <div
        className={buildClassName('ListItem-button', isTouched && 'active')}
        role="button"
        ref={buttonRef}
        tabIndex={0}
        onClick={!inactive && IS_TOUCH_ENV ? handleClick : undefined}
        onMouseDown={handleMouseDown}
        onContextMenu={!inactive && contextActions ? handleContextMenu : undefined}
      >
        {icon && (
          <i className={`icon-${icon}`} />
        )}
        {multiline && (<div className="multiline-item">{children}</div>)}
        {!multiline && children}
        {!disabled && !inactive && ripple && (
          <RippleEffect />
        )}
      </div>
      {contextActions && contextMenuPosition !== undefined && (
        <Menu
          isOpen={isContextMenuOpen}
          positionX={positionX}
          positionY={positionY}
          style={menuStyle}
          className="ListItem-context-menu"
          autoClose
          onClose={handleContextMenuClose}
          onCloseAnimationEnd={handleContextMenuHide}
        >
          {contextActions.map((action) => (
            <MenuItem
              key={action.title}
              icon={action.icon}
              destructive={action.destructive}
              disabled={!action.handler}
              onClick={action.handler}
            >
              {action.title}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default ListItem;
