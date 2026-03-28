import React, { useEffect, useState } from 'react';
import { BRAND_NAME } from '../constants/branding';
import BrandLogo from './BrandLogo';
import {
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

/**
 * Authenticated app layout: responsive sidebar, main scroll area, consistent chrome.
 */
const AppShell = ({
  user,
  sidebarTitle,
  sidebarItems = [],
  pageTitle,
  pageSubtitle,
  /** e.g. purchase-flow back control */
  toolbar = null,
  onLogout,
  onBrandClick,
  children,
  /** Desktop: start collapsed to icons-only */
  collapsibleDesktop = true,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (item) => {
    item.onClick?.();
    closeMobile();
  };

  const showLabels = !desktopCollapsed;

  return (
    <div className="flex min-h-[calc(100vh-0px)] bg-[#0b0f1a] text-white">
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.08] bg-[#0b0f1a]/95 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-[#0b0f1a]/80">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={onBrandClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src="/coverkit-icon.png"
            alt=""
            className="h-8 w-8 object-contain"
            aria-hidden="true"
          />
          <span className="text-sm font-bold tracking-tight text-white">{BRAND_NAME}</span>
        </button>
        <div className="w-10" aria-hidden />
      </header>

      {/* Overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col border-r border-white/[0.08] bg-[#0f1419] shadow-2xl shadow-black/40 transition-[transform,width] duration-300 ease-out md:static md:translate-x-0',
          desktopCollapsed ? 'md:w-[4.25rem]' : 'md:w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/[0.08] px-3 md:h-[3.75rem] md:px-4">
          <button
            type="button"
            onClick={() => {
              onBrandClick?.();
              closeMobile();
            }}
            className={`flex min-w-0 items-center gap-2.5 rounded-xl py-2 text-left transition hover:bg-white/5 ${showLabels ? 'flex-1 px-2' : 'justify-center px-0 md:flex-1'}`}
            aria-label={BRAND_NAME}
          >
            {showLabels ? (
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <img
                    src="/coverkit-icon.png"
                    alt=""
                    className="h-8 w-8 shrink-0 object-contain"
                    aria-hidden="true"
                  />
                  <span className="truncate text-sm font-bold tracking-tight text-white">
                    {BRAND_NAME}
                  </span>
                </div>
                {sidebarTitle && (
                  <span className="truncate text-[10px] font-medium uppercase tracking-wider text-slate-500 pl-10">
                    {sidebarTitle}
                  </span>
                )}
              </div>
            ) : (
              <img
                src="/coverkit-icon.png"
                alt="CoverKit"
                className="h-8 w-8 object-contain"
              />
            )}
          </button>
          <button
            type="button"
            onClick={closeMobile}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
          {collapsibleDesktop && (
            <button
              type="button"
              onClick={() => setDesktopCollapsed((c) => !c)}
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white md:flex"
              aria-label={desktopCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {desktopCollapsed ? (
                <PanelLeft className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 md:p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = item.active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                title={!showLabels ? item.label : undefined}
                className={[
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition',
                  active
                    ? 'bg-primary-500/15 text-primary-200 ring-1 ring-primary-500/35'
                    : 'text-slate-400 hover:bg-white/[0.06] hover:text-slate-200',
                  !showLabels && 'justify-center px-0',
                ].join(' ')}
              >
                {Icon && (
                  <Icon
                    className={`h-5 w-5 shrink-0 ${active ? 'text-primary-400' : 'text-slate-500'}`}
                    strokeWidth={1.75}
                  />
                )}
                {showLabels && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-white/[0.08] p-3 md:p-4">
          {showLabels && user && (
            <div className="mb-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]">
              <p className="truncate text-xs font-medium text-slate-500">Signed in</p>
              <p className="truncate text-sm font-semibold text-slate-200">
                {user.name || user.username || user.email}
              </p>
              {user.role && (
                <p className="mt-0.5 truncate text-[11px] text-slate-500">{user.role}</p>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={onLogout}
            title={!showLabels ? 'Log out' : undefined}
            className={`flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-200 ${!showLabels ? 'justify-center px-0' : ''}`}
          >
            <LogOut className="h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.75} />
            {showLabels && <span>Log out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col pt-14 md:pt-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="relative min-h-full">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 0%, rgba(26,137,255,0.12), transparent 45%), radial-gradient(circle at 80% 20%, rgba(74,222,128,0.06), transparent 40%)',
              }}
            />
            <div className="relative w-full min-w-0 px-4 py-6 sm:px-5 lg:px-6 xl:px-8 lg:py-8">
              {(pageTitle || pageSubtitle || toolbar) && (
                <header className="mb-8 border-b border-white/[0.06] pb-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0">
                      {pageTitle && (
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                          {pageTitle}
                        </h1>
                      )}
                      {pageSubtitle && (
                        <p className="mt-1.5 text-sm text-slate-400 sm:text-base">{pageSubtitle}</p>
                      )}
                    </div>
                    {toolbar && (
                      <div className="flex shrink-0 flex-wrap items-center gap-2">{toolbar}</div>
                    )}
                  </div>
                </header>
              )}
              <div className="animate-in">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
