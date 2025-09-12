import * as React from 'react';

interface EmailTemplateProps {
 code: string;
}

export function EmailTemplate({ code }: EmailTemplateProps) {
  return (
    <div>
      <h1>code, {code}!</h1>
      <p>Expires in 15 minutes</p>
    </div>
  );
}