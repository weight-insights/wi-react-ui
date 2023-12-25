import Accordion from '../components/Accordion';

function AccordionPage() {
  const items = [
    {
      id: 'a1',
      label: 'First label',
      content: 'This is the first content about accordion.'
    },
    {
      id: 'a2',
      label: 'Second label',
      content: 'This is the second content about accordion. This is the second content about accordion.'
    },
    {
      id: 'a3',
      label: 'Third label',
      content: 'This is the third content about accordion. This is the third content about accordion. This is the third content about accordion.'
    }
  ];
  return (
    <div>
      <Accordion items={items} />
    </div>
  );
}

export default AccordionPage;