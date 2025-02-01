import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/shared/ui/accordion';
import { DispensedKatas } from './dispensed-katas';
import { ForbiddenKatas } from './forbidden-katas';
import { SuggestedKatas } from './suggested-katas';
import { UserList } from './user-list';

// flex min-h-screen max-w-screen-sm flex-col items-center justify-center

const enum AccordionSection {
  USERS = 'Users',
  FORBIDDEN_KATAS = 'Forbidden Katas',
  SUGGESTED_KATAS = 'Suggested Katas',
  DISPENSED_KATAS = 'Dispensed Katas',
}

const accordionSections = [
  [AccordionSection.USERS, UserList],
  [AccordionSection.FORBIDDEN_KATAS, ForbiddenKatas],
  [AccordionSection.SUGGESTED_KATAS, SuggestedKatas],
  [AccordionSection.DISPENSED_KATAS, DispensedKatas],
] as const;

export const MainPage = () => {
  const [expanded, setExpanded] = useState<string[]>([
    AccordionSection.USERS,
    AccordionSection.SUGGESTED_KATAS,
    AccordionSection.DISPENSED_KATAS,
  ]);

  return (
    <main className="flex min-h-screen items-center justify-center px-8">
      <Accordion
        type="multiple"
        className="w-full max-w-screen-sm"
        value={expanded}
        onValueChange={setExpanded}
      >
        {accordionSections.map(([title, Component]) => (
          <AccordionItem
            key={title}
            value={title}
          >
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
              <Component />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};
