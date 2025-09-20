const PrivacyPolicy = () => {
    return (
        <div className="mx-auto px-6 py-12 text-gray-800 mt-6 md:mt-24 mb-6 md:mb-52">
            <h1 className="text-3xl font-bold mb-6 text-[#000]">
                Privacy Policy
            </h1>
            <p className="mb-4">
                At <strong>Medics.</strong>, your privacy is important to us. This Privacy Policy
                explains how we collect, use, and safeguard your information when you use our
                medicine reminder and tracking app.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <p className="mb-4">
                We collect only the information necessary to provide our services, such as:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Medicine details (name, dosage, schedule, and reminders)</li>
                <li>Basic device information for app functionality</li>
                <li>Optional health-related notes added by the user</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">Your information is used to:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Send you medicine reminders and notifications</li>
                <li>Track your medicine history and refill alerts</li>
                <li>Improve app functionality and user experience</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
            <p className="mb-4">
                We use industry-standard measures to protect your personal data. Your reminders
                and medicine details are stored securely and are not shared with third parties.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
            <p className="mb-4">
                Our app does not sell, trade, or rent your personal information. However, we may
                use trusted third-party services (such as cloud storage or analytics) that
                adhere to strict privacy policies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
            <p className="mb-4">
                You have the right to access, update, or delete your data at any time. If you
                uninstall the app, all locally stored data will be removed from your device.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes will be
                reflected here with an updated revision date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
            <p>
                If you have questions or concerns about this Privacy Policy, please contact us
                at: <strong>support@medicsapp.com</strong>
            </p>

            <p className="mt-8 text-sm text-gray-500">
                Last Updated: {new Date().toLocaleDateString()}
            </p>
        </div>
    );
};

export default PrivacyPolicy;
