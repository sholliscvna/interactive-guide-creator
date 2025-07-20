import React from 'react';

// --- UI Icons ---
export const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

export const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 01-.749.654h-10.5a.75.75 0 01-.749-.654L5.29 6.66a.75.75 0 011.478-.256l3.878-.512v-.227c0-.597.237-1.17.659-1.591l.622-.622a2.25 2.25 0 013.182 0l.622.622c.422.422.659.994.659 1.591zm-4.5-1.765a.75.75 0 011.06 0l.622.622a.75.75 0 01.22.531v.227a49.345 49.345 0 00-3.032 0v-.227a.75.75 0 01.22-.531l.622-.622a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

// --- Marker Icons (Material Symbols) ---
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "w-6 h-6",
};

export const HelpIcon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14h2v2h-2V6zm0 4h2v6h-2v-6z"/></svg>
);

export const LightbulbCircleIcon = () => (
    <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9.5 16.5c0 .83.67 1.5 1.5 1.5h2c.83 0 1.5-.67 1.5-1.5v-1.25h-5V16.5zm.5-2.25h4v-1h-4v1zM12 6.25c-1.38 0-2.5 1.12-2.5 2.5h1.25c0-.69.56-1.25 1.25-1.25s1.25.56 1.25 1.25c0 .69-.56 1.25-1.25 1.25H11v1.25h2v-1.25c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25c0-.69-.56-1.25-1.25-1.25z"/></svg>
);

export const ProblemIcon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg>
);

export const DataInfoAlertIcon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9h2v6h-2v-6zm0-4h2v2h-2V7z"/></svg>
);

export const ReportIcon = () => (
  <svg {...iconProps}><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3s.58-1.3 1.3-1.3 1.3.58 1.3 1.3-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"/></svg>
);

export const Counter1Icon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15V8.5h-1V7h3v1.5h-1V17h-1z"/></svg>
);

export const Counter2Icon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-3v-2h3v-1c0-1.66 1.34-3 3-3h1V7h-4v2h2v2h-2c-2.21 0-4 1.79-4 4v2h3v-1z"/></svg>
);

export const Counter3Icon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1.66 0-3-1.34-3-3 0-1.3.84-2.4 2-2.82V11H9V9h4v2h-1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5H15v2h-3v1z"/></svg>
);

export const Counter4Icon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 15H12v-6h1.5v6zm-3-6H9v5H7.5V7H9v4h1.5v6z"/></svg>
);

export const Counter5Icon = () => (
  <svg {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-4v-2h2v-1c0-1.1.9-2 2-2h2V7h-4v2h2v2h-2c-1.1 0-2 .9-2 2v3h4v-2h-2v1z"/></svg>
);

export const MARKER_ICONS: { [key: string]: React.FC } = {
    help: HelpIcon,
    lightbulb: LightbulbCircleIcon,
    problem: ProblemIcon,
    info: DataInfoAlertIcon,
    report: ReportIcon,
    '1': Counter1Icon,
    '2': Counter2Icon,
    '3': Counter3Icon,
    '4': Counter4Icon,
    '5': Counter5Icon,
};

export const MARKER_COLORS = ['#0D375E', '#228BE6', '#FAB005']; // Dark Blue, Primary Blue, Yellow
