export function loadComponent(selector: string, file: string): Promise<void> {
  return fetch(file)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`Kunde inte ladda ${file}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((data: string) => {
      const element = document.querySelector(selector);
      if (element) {
        element.innerHTML = data;
      } else {
        console.error(`Element med selektorn "${selector}" kunde inte hittas.`);
      }
    })
    .catch((error: Error) => console.error(error));
}
