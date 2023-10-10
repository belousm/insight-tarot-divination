<script>
    // Import necessary modules and components
    import { goto } from "$app/navigation";
    import { user, isValidDate } from "$lib";
    import { setUser } from "$lib/api/user";
    import Chip from "../../../components/base/Chip.svelte";
    import Input from "../../../components/base/Input.svelte";
    import Button from "../../../components/base/button/Button.svelte";
    import Icon from "../../../components/base/icons/Icon.svelte";
    import Edit from "../../../components/pages/profile/Edit.svelte";
    import Profile from "../../../components/pages/profile/Profile.svelte";
    import InputDate from "../../../components/base/InputDate.svelte";

    // Define arrays
    const genders = [
        {
            type: "Female",
            icon: "female",
        },
        {
            type: "Male",
            icon: "male",
        },
        {
            type: "Other",
            icon: "other",
        },
    ];

    const occupations = [
        {
            name: "Student",
            selected: false,
        },
        {
            name: "Business owner",
            selected: false,
        },
        {
            name: "Looking for a job",
            selected: false,
        },
        {
            name: "Freelancer",
            selected: false,
        },
        {
            name: "Employee",
            selected: false,
        },
        {
            name: "Homemaker",
            selected: false,
        },
        {
            name: "Unemployed",
            selected: false,
        },
    ];

    const relationships = [
        {
            name: "Single",
            selected: false,
        },
        {
            name: "Flirting",
            selected: false,
        },
        {
            name: "Engaged",
            selected: false,
        },
        {
            name: "Married",
            selected: false,
        },
        {
            name: "Complicated",
            selected: false,
        },
        {
            name: "Exclusive relationships",
            selected: false,
        },
        {
            name: "Newly broke up",
            selected: false,
        },
        {
            name: "Divorced",
            selected: false,
        },
    ];

    // Check if user data is available and update selected occupation and relationship options
    $: if ($user) {
        for (let i = 0; i < relationships.length; i++) {
            const r = relationships[i];
            if (r.name == $user["relationship"]) {
                relationships[i].selected = true;
            }
        }

        for (let i = 0; i < occupations.length; i++) {
            const o = occupations[i];
            if (o.name == $user["occupation"]) {
                occupations[i].selected = true;
            }
        }
    }

    let showError = false; // Initialize a variable to show error message

    // Function to save user information
    const saveUserInfo = async () => {
        if (!isValidDate($user["date_birth"])) {
            $user["date_birth"] = ""; // Clear date_birth if it's not a valid date
            showError = true; // Show error message
            return;
        }

        const body = {
            user_uid: $user["user_uid"],
        };
        if ($user["name"]) {
            body["name"] = $user["name"];
        }
        if ($user["sex"]) {
            body["sex"] = $user["sex"];
        }
        if ($user["date_birth"]) {
            body["date_birth"] = $user["date_birth"];
        }
        if ($user["occupation"]) {
            body["occupation"] = $user["occupation"];
        }
        if ($user["relationship"]) {
            body["relationship"] = $user["relationship"];
        }

        for (let item in body) {
            $user[item] = body[item]; // Update user data with the new values
        }

        const result = await setUser(body); // Call the setUser function to update user data

        goto("/profile"); // Navigate to the profile page after saving changes
    };
</script>

<!-- Render the Profile component -->
<Profile />

<!-- Render the Edit component for user's name -->
<Edit caption="Name">
    <Input
        name="name"
        placeholder="Your name"
        bind:value={$user["name"]}
        required
    />
</Edit>

<!-- Render the Edit component for date of birth -->
<Edit caption="Date of birth">
    <button
        class="flex flex-col box-border w-full"
        on:click={() => {
            document.querySelector(".dateInput").showPicker();
        }}
    >
        <InputDate
            class="dateInput {showError ? 'border-red' : ''}"
            name="date"
            bind:value={$user["date_birth"]}
            required
        />
        {#if showError}
            <p class="pl-4 text-base font-inter text-red">Wrong Date</p>
        {/if}
    </button>
</Edit>

<!-- Render the Edit component for selecting gender -->
<Edit caption="Gender">
    <div class="w-full flex justify-between gap-1.5">
        {#each genders as { type, icon }}
            <button
                class="flex w-full flex-col justify-center items-center gap-6 p-2.5 pt-10 group border border-transparent rounded-xl {icon.includes(
                    'active'
                ) || $user['sex'] == type
                    ? 'box'
                    : ''} rounded-xl relative"
                on:click={() => {
                    if (icon.includes("active") || $user["sex"] == type) {
                        return;
                    }
                    genders.forEach((g) => {
                        g.icon = g.icon.split("active")[0];
                    });
                    icon = icon + "active";

                    $user["sex"] = type;
                }}
            >
                <Icon
                    type={$user["sex"] == type && !icon.includes("active")
                        ? `${icon}active`
                        : icon}
                    class="w-[3.125rem] h-[3.125rem]"
                    color="{icon.includes('active') || $user['sex'] == type
                        ? 'fill-white'
                        : 'fill-pink'} group-hover:fill-white transition"
                />
                <p
                    class="text-2xl font-semibold text-center {icon.includes(
                        'active'
                    ) || $user['sex'] == type
                        ? 'text-white'
                        : 'text-pink'} group-hover:text-white transition"
                >
                    {type}
                </p>

                {#if icon.includes("active") || $user["sex"] == type}
                    <img
                        src="/images/entrance/gradient-border.png"
                        class="w-full h-full absolute left-0 top-0"
                        alt=""
                    />
                {/if}
            </button>
        {/each}
    </div>
</Edit>

<!-- Render the Edit component for selecting occupation -->
<Edit caption="Occupation">
    <div class="flex box-border w-full gap-2 flex-wrap">
        {#each occupations as { name, selected }}
            <Chip
                on:click={() => {
                    occupations.forEach((o) => {
                        o.selected = false;
                    });
                    selected = true;
                    $user["occupation"] = name;
                }}
                {name}
                bind:selected
            />
        {/each}
    </div>
</Edit>

<!-- Render the Edit component for selecting relationship -->
<Edit caption="Relationship" class="!pb-28">
    <div class="flex box-border w-full gap-2 flex-wrap">
        {#each relationships as { name, selected }}
            <Chip
                on:click={() => {
                    relationships.forEach((r) => {
                        r.selected = false;
                    });
                    selected = true;
                    $user["relationship"] = name;
                }}
                {name}
                bind:selected
            />
        {/each}
    </div>
</Edit>

<!-- Render the Save Changes button -->
<Button
    on:click={saveUserInfo}
    name="Save changes"
    class="w-full mt-4 fixed bottom-16"
/>
