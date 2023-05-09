import "./index.scss";

import { useQueryClient } from '@tanstack/react-query';
import { CONFIG_QUERY_KEY } from '@utils/queryKeys';
import { selectHeaderConfig } from '@utils/selectors/configSelector';
import { Response } from '@utils/selectors/configSelector';

interface HeaderConfig {
  styles?: HeaderStyles
}

interface HeaderStyles {
  isGradientBackground: true,
  gradientBackgroundColor: {
    direction: string,
    firstColor: string,
    secondColor: string,
  }
}

export default function Header() {
  const queryClient = useQueryClient();
  const response = queryClient.getQueryData<Response>(CONFIG_QUERY_KEY);

  if (response === undefined) return null;

  const headerConfig: HeaderConfig | null = selectHeaderConfig(response);
  const gradientBackgroundColor = headerConfig?.styles?.gradientBackgroundColor;
  const style = {
    backgroundImage: ''
  };
  
  if (gradientBackgroundColor) {
    style.backgroundImage = `linear-gradient( ${gradientBackgroundColor.direction}, ${gradientBackgroundColor.firstColor}, ${gradientBackgroundColor.secondColor})`;
  }

  return (
    <header className="astro-header" style={style}>
    </header>
  )
}