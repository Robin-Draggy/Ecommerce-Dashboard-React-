import React from 'react'
import { Link, useMatches } from 'react-router-dom';

export const Breadcrumb = () => {
    const matches = useMatches();
    const crumbs = matches.filter((match) => match.route.meta?.breadcrumb).map((match => ({
        label: match.route.meta.breadcrumb,
        path: match.pathname
    })));
  return (
    <div className='flex items-center justify-between'>
        {crumbs.map((crumb, index) => {
            const last = index === crumbs.length - 1;
            return(
                <div key={crumb.path}>
                    {last ? (
                        <span>{crumb.label}</span>
                    ) : (
                        <Link to={crumb.path}>{crumb.label}</Link>
                    )}
                </div>
            )
        })}
    </div>
  )
}
