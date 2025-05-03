<script lang="ts">
  export let lang: string = 'en';

  // Form labels
  const nameLabel = lang === 'en' ? 'Name *' : 'Nombre *';
  const emailLabel = lang === 'en' ? 'Email *' : 'Email *';
  const phoneLabel = lang === 'en' ? 'Phone (optional)' : 'Teléfono (opcional)';
  const messageLabel = lang === 'en' ? 'Message *' : 'Mensaje *';
  const submitButtonText = lang === 'en' ? 'Send message' : 'Enviar mensaje';

  // Form values
  let nameValue: string = '';
  let emailValue: string = '';
  let phoneValue: string = '';
  let messageValue: string = '';

  // Form config
  let isSuccess: boolean = false;
  let isLoading: boolean = false;

  // Google form config
  const FORM_URL =
    'https://docs.google.com/forms/d/e/1FAIpQLSdbGSa1AyQvgHGL7WE34ZbTzfukG9oOiLL3tlRFCjULr76sKA/formResponse';
  const FORM_ENTRIES = {
    name: 'entry.1008715654',
    email: 'entry.903587259',
    phone: 'entry.677814908',
    message: 'entry.110815800',
  };

  async function handleSubmit(event: Event) {
    event.preventDefault();
    isLoading = true;

    console.log('----- handle submit -----');
    console.log(nameValue, emailValue, phoneValue, messageValue);
    try {
      const formData = new FormData();
      formData.append(FORM_ENTRIES.name, nameValue);
      formData.append(FORM_ENTRIES.email, emailValue);
      formData.append(FORM_ENTRIES.phone, phoneValue);
      formData.append(FORM_ENTRIES.message, messageValue);


      // Register event on google analytics
      // analytics.capture('confirmation_submitted', {
      //   inviteCode: invite.code,
      //   partyAttendance,
      //   stayAttendance,
      //   hasMessage: message.trim().length > 0,
      // });

      await fetch(FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: new URLSearchParams(formData as any),
      });

      isSuccess = true;
    } catch (error) {
      console.error('Form error:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<form onsubmit={handleSubmit} class="bg-cream shadow-lg p-4 space-y-3">
  <div>
    <label class="block text-sm font-medium mb-1" for="name">{nameLabel}</label>
    <input
      type="text"
      id="name"
      name="name"
      bind:value={nameValue}
      required
      autocomplete="off"
      class="w-full border bg-cream-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1" for="email">{emailLabel}</label>
    <input
      type="email"
      id="email"
      name="email"
      bind:value={emailValue}
      required
      autocomplete="off"
      class="w-full border bg-cream-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1" for="phone">{phoneLabel}</label>
    <input
      type="tel"
      id="phone"
      name="phone"
      bind:value={phoneValue}
      autocomplete="off"
      class="w-full border bg-cream-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1" for="message">{messageLabel}</label>
    <textarea
      id="message"
      name="message"
      rows="3"
      bind:value={messageValue}
      required
      autocomplete="off"
      class="w-full border bg-cream-light border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
    ></textarea>
  </div>
  <button type="submit" class="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-900 transition"
    >{submitButtonText}</button
  >
</form>