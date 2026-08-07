import { CLIENT_SECTIONS } from "@/lib/constants";
import { ClientStorySection } from "@/components/ClientStorySection";

export function ClientStories() {
  return (
    <>
      {CLIENT_SECTIONS.map((client, index) => (
        <ClientStorySection key={client.id} client={client} index={index} reversed={index % 2 === 1} />
      ))}
    </>
  );
}
