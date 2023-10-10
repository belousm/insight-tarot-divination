<script>
    // Import the Profile component
    import Profile from "../../components/pages/profile/Profile.svelte";

    // Function to share the application using the Web Share API
    const share = () => {
        // Check if the Web Share API is supported in the browser
        if (navigator.share) {
            // Define the data to be shared
            const shareData = {
                title: "Insight",
                text: "Telegram Tarot Devinations",
                url: "https://t.me/psy_labs_insight_bot/insight",
            };

            // Use the Web Share API to share the data
            navigator
                .share(shareData)
                .then(() => {
                    console.log("Succesfully send");
                })
                .catch((error) => {
                    console.error("Error while sharing: ", error);
                });
        } else {
            // Display an alert if the Web Share API is not supported
            alert("Web Share API not supported in your browser");
        }
    };

    // Define an array of items for the profile page
    const items = [
        {
            name: "Share the app",
            type: "button",
            action: share,
        },
        {
            name: "Contact us",
            type: "link",
            href: "https://t.me/quan00b",
        },
        {
            name: "About Insight",
            type: "buttonText",
            description: `Welcome to Insight - Fortune Telling Telegram Web Application! Our Application, crafted with precision and intuition, serves as a conduit for those seeking answers and insights beyond the ordinary. With a commitment to user privacy and a seamless experience, Insight brings ancient art of fortune telling into the modern age, where tradition meets innovation, and clarity is always just a click away.
                <br />For any inquiries, feel free to reach us at <a href="mailto:psylabs.info@gmail.com">psylabs.info@gmail.com</a>. Your journey to unlocking the mystical realms begins with Insight!
            `,
            shown: false,
        },
        {
            name: "Terms of use",
            type: "buttonText",
            description: `1. Acceptance of Terms
                <br />1.1. These Terms of Use ("Terms") govern your access to and use of the Insight - Fortune Telling Telegram Web Application ("Application"). The Application is owned and operated by the Developer. By accessing or using the Application, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the Application.
                <br /><br />2. Changes to Terms
                <br />2.1. The Developer reserves the right to modify these Terms at any time without prior notice. You are advised to review these Terms periodically for any changes. Your continued use of the Application following the posting of changes will mean that you accept and agree to the modifications.
                <br /><br />3. Use of the Application
                <br />3.1. The Application is intended for personal, non-commercial use only.
                <br />3.2. Users must be at least 18 years of age to use the Application. By accessing or using the Application, you represent and warrant that you are 18 or older, and that you agree to and will comply with these Terms.
                <br />3.3. The Application is provided "as is" without warranty of any kind, express or implied, including but not limited to the warranties of accuracy, reliability, or fitness for a particular purpose.
                <br /><br />4. Limitation of Liability
                <br />4.1. In no event shall the Developer be liable for any direct, indirect, incidental, special, punitive, or consequential damages whatsoever resulting from the use or inability to use the Application.
                <br />4.2. The Developer takes no responsibility and assumes no liability for any content, information, or services available through the Application, nor for any errors or omissions.
                <br /><br />5. Content
                <br />5.1. The Application, including but not limited to text, content, photographs, video, audio, and graphics contained therein, is protected by copyrights, trademarks, service marks, and/or other proprietary rights and laws.
                <br />5.2. Users may not modify, copy, distribute, transmit, display, publish, sell, license, or create derivative works from any content, information, or services obtained from the Application.
                <br /><br />6. User Conduct
                <br />6.1. Users agree not to use the Application for any unlawful purposes or to conduct any unlawful activity.
                <br />6.2. Users agree not to use the Application if it is prohibited by law in their country of residence or if they are otherwise prohibited by applicable rules or regulations from accessing or using the Application.
                <br /><br />7. Termination
                <br />7.1. The Developer reserves the right, in its sole discretion, to restrict, suspend, or terminate your access to the Application, at any time, for any or no reason, with or without prior notice, and without liability.
                <br /><br />8. Contact
                <br />8.1. For any questions regarding these Terms, please contact the Developer at psylabs.info@gmail.com.
                <br /><br />Last Updated
                <br />These Terms were last updated on October 6, 2023.
            `,
            shown: false,
        },
        {
            name: "Privacy policy",
            type: "buttonText",
            description: `General Provisions
                <br />1.1. This Privacy Policy (hereinafter - the Policy) establishes the procedure for processing and protecting information about individuals using the Insight - Fortune Telling Telegram Web Application (hereinafter – Users).
                <br />1.2. The use of Insight - Fortune Telling Telegram WEB Application signifies the User's unconditional consent to this Policy and the stated terms of processing their personal information; if the User disagrees with these terms, they should refrain from using the application.
                <br />
                <br />User Data
                <br />2.1. Insight - Fortune Telling Telegram Web Application does not collect or store the User’s personal data.
                <br />2.2. All data entered by the User into the application are not transferred to third parties and are not used for purposes other than for the functioning of the application.
                <br />
                <br />Liability
                <br />3.1. The User understands and accepts that the information and materials contained in the Insight - Fortune Telling Telegram Web Application are provided "as is," without any warranties.
                <br />3.2. The Developer is not liable for any damage or losses incurred by the User or third parties as a result of using or being unable to use the application.
                <br />3.3. Insight - Fortune Telling Telegram Web Application does not provide professional consultations or services and should not be used as a substitute for consultations with specialists.
                <br />
                <br />Special Conditions
                <br />4.1. The Developer reserves the right at any time to change or supplement this Policy without prior notice to Users.
                <br />4.2. The new edition of the Policy comes into force from the moment it is posted in the application unless otherwise provided by the new edition of the Policy.
                <br />4.3. The User is obliged to independently monitor changes in the Policy.
                <br />
                <br />Contact Information
                <br />5.1. All suggestions or questions about this Policy should be reported to the developer's email address <a href="mailto:psylabs.info@gmail.com">psylabs.info@gmail.com</a>.
                <br />
                <br />Last updated: October 6, 2023`,
            shown: false,
        },
    ];
</script>

<Profile />

<div class="flex flex-col gap-2 py-2">
    {#each items as item, i}
        {#if item.type == "button"}
            <!-- Render a button with a click event -->
            <button
                class="flex items-center justify-between box-border px-4 py-2"
                on:click={item.action}
            >
                <span class="font-inter text-white text-base font-light"
                    >{item.name}</span
                >
                <img src="/images/chevrons/chevron-right.svg" alt="" />
            </button>
        {:else if item.type == "link"}
            <!-- Render a link to an external URL -->
            <a
                href={item.href}
                class="flex items-center justify-between box-border px-4 py-2"
            >
                <span class="font-inter text-white text-base font-light"
                    >{item.name}</span
                >
                <img src="/images/chevrons/chevron-right.svg" alt="" />
            </a>
        {:else if item.type == "buttonText"}
            <!-- Render a button to show/hide text content -->
            <button
                on:click={() => {
                    item.shown = !item.shown;
                }}
                class="flex items-center justify-between box-border px-4 py-2"
            >
                <span class="font-inter text-white text-base font-light"
                    >{item.name}</span
                >
                <img
                    src="/images/chevrons/chevron-{item.shown
                        ? 'up'
                        : 'down'}.svg"
                    alt=""
                />
            </button>
            {#if item.shown}
                <!-- Display the text content if item.shown is true -->
                <p
                    class="px-4 py-3 font-inter leading-[18px] text-sm font-light text-lightgray"
                >
                    {@html item.description}
                </p>
            {/if}
        {/if}
        {#if i < items.length - 1}
            <!-- Render a horizontal separator if not the last item -->
            <div class="h-px w-full opacity-10 bg-white" />
        {/if}
    {/each}
</div>
