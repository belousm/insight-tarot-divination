<script>
    // Import necessary modules and components
    import { user } from "$lib";
    import ButtonLink from "../../components/base/button/ButtonLink.svelte";
    import Information from "../../components/pages/profile/Information.svelte";
    import Profile from "../../components/pages/profile/Profile.svelte";
</script>

<!-- Render the Profile component -->
<Profile />

<!-- Render Information components to display user data -->
<Information caption="Name" value={$user?.name ?? "-"} />
<Information caption="Date of birth" value={$user?.date_birth ?? "-"} />
<Information caption="Sex" value={$user?.sex ?? "-"} />
<Information caption="Occupation" value={$user?.occupation ?? "-"} />
<Information caption="Relationships" value={$user?.relationship ?? "-"} />

<!-- Render a ButtonLink component to navigate to the Edit Profile page -->
<ButtonLink
    href="/profile/edit"
    name="Edit personal info"
    class="w-full p-4 mt-4"
/>
