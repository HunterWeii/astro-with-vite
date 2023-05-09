import "./index.scss";

import { useQueryClient } from '@tanstack/react-query';
import { CONFIG_QUERY_KEY } from '@utils/queryKeys';
import { selectFooterConfig } from '@src/utils/selectors/configSelector';
import { Response } from '@utils/selectors/configSelector';

interface FooterConfig {
  styles ?: FooterStyle
}

interface FooterStyle {
  backgroundColor: string
}

export default function Footer() {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData<Response>(CONFIG_QUERY_KEY);

  if (response === undefined) return null;

  const footerConfig: FooterConfig | null = selectFooterConfig(response);
  const style = {
    backgroundColor: footerConfig?.styles?.backgroundColor ?? '#fff'
  };

  return (
    <footer className="astro-footer" style={style}>
    </footer>
  )
}