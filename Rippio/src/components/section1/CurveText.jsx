/* eslint-disable react/prop-types */
export function CurveText({children}) {
    return (
        <svg className="Categories-content-item-title" width={100} height={30}>
            <path id='curve' d='M 0 37 C 0 37, 50 -28, 98 37' />
            <text fontWeight='800' fontFamily="Arial" fontSize="11px" textAnchor="middle">
                <textPath href="#curve" startOffset="50%">
                    {children}
                </textPath>
            </text>
        </svg>
    )
}