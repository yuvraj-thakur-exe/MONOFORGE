'use client';

import { useTranslations } from 'next-intl';

import { object } from '#/utils/object';
import { observer } from 'mobx-react-lite';

import { GroupFields } from '#/components/organisms/group-fields';

import { Text } from '#/components/atoms/text';
import { Callout } from '#/components/atoms/callout';

import { useCanvas, useTranslateField } from '#/hooks';

import { first_group, second_group } from './fields';
import { projects_links } from './content';

type Projects = keyof typeof projects_links;

export const Currently = observer(function Currently() {
  const canvasStore = useCanvas();
  const tUi = useTranslations('ui');
  const translate = useTranslateField();

  const project = object.deep.get<Projects>(
    canvasStore.$currentSection,
    'props.content.currently.project'
  )!;

  const links = projects_links[project] ?? [];

  const listItems = [1, 2, 3, 4].map(id => ({
    id,
    content: tUi(`music.currently.list-item-${id}`),
  }));

  return (
    <div className="flex flex-col">
      <Callout className="palette-orange mb-sm">
        {tUi('music.currently.callout')}{' '}
        <ul className="flex flex-col">
          {listItems.map(item => (
            <li
              key={item.id}
              dangerouslySetInnerHTML={{ __html: item.content }}
              className="relative list-[circle]! ml-md"
            />
          ))}
        </ul>
      </Callout>

      {first_group.map(group => (
        <GroupFields key={group.id} {...group} />
      ))}

      <Callout className="palette-orange mb-sm">
        {tUi('music.currently.links', { project })}
        <div className="flex flex-col gap-1 mt-1">
          {links.map(item => (
            <div key={item.label} className="flex flex-col gap-0.5">
              {item.instruction && (
                <p className="text-xs opacity-90">{item.instruction}</p>
              )}
              {item.link && (
                <Text.Link
                  href={item.link}
                  {...(item.link.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {translate(item.label)}
                </Text.Link>
              )}
            </div>
          ))}
        </div>
      </Callout>

      {second_group.map(group => (
        <GroupFields key={group.id} {...group} />
      ))}
    </div>
  );
});
