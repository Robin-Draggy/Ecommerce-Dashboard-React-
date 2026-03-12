import React from 'react';

export const Loader = ({ 
  type = 'spinner', 
  size = 'medium', 
  color = 'blue',
  text = '',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    red: 'border-red-600',
    green: 'border-green-600',
    purple: 'border-purple-600',
    white: 'border-white'
  };

  const getColorClass = (element = 'border') => {
    if (element === 'bg') {
      return color === 'white' ? 'bg-white' : `bg-${color}-600`;
    }
    return colorClasses[color] || colorClasses.blue;
  };

  const renderLoader = () => {
    switch(type) {
      case 'spinner':
        return (
          <div 
            className={`
              ${sizeClasses[size]} 
              border-4 
              border-t-4 
              border-gray-200 
              ${getColorClass()}
              rounded-full 
              animate-spin
            `}
          />
        );
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'}
                  ${getColorClass('bg')}
                  rounded-full
                  animate-bounce
                `}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        );
      
      case 'progress':
        return (
          <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getColorClass('bg')} rounded-full animate-pulse`}
              style={{ width: '60%' }}
            />
          </div>
        );
      
      case 'pulse':
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`
                  ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'}
                  ${getColorClass('bg')}
                  rounded-full
                  animate-pulse
                `}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );
      
      case 'ring':
        return (
          <div className="relative">
            <div 
              className={`
                ${sizeClasses[size]} 
                border-4 
                border-gray-200 
                rounded-full
              `}
            />
            <div 
              className={`
                ${sizeClasses[size]} 
                border-4 
                ${getColorClass()}
                rounded-full
                absolute 
                top-0 
                left-0 
                animate-spin
              `}
              style={{ clipPath: 'inset(0 0 50% 0)' }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <span className={`text-${color}-600 text-${size === 'small' ? 'sm' : size === 'medium' ? 'base' : 'lg'}`}>
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};
