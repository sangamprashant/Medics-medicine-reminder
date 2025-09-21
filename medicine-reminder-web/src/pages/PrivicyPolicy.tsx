const PrivacyPolicy = () => {
    return (
        <div className="mx-auto px-6 py-12 text-gray-800 mt-6 md:mt-24 mb-6 md:mb-52 max-w-4xl leading-relaxed">
            <h1 className="text-3xl font-bold mb-6 text-[#000]">
                Privacy Policy
            </h1>
            <p className="mb-4">
                <strong>Medics</strong> is a medicine reminder and tracking app developed and maintained
                by <strong> <a href="https://techorbitals.in/" target="_blank" rel="noopener noreferrer">Tech Orbitals</a> </strong>. Your privacy is important to us. This Privacy Policy
                explains how we collect, use, and safeguard your information when you use our services.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
            <p className="mb-4">We collect only the information necessary to provide our services:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Medicine details (name, dosage, schedule, reminders)</li>
                <li>Basic device information for app functionality</li>
                <li>Optional health-related notes added by the user</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
            <p className="mb-4">Your information is used to:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Send medicine reminders and notifications</li>
                <li>Track medicine history and refill alerts</li>
                <li>Enhance app performance and user experience</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
            <p className="mb-4">
                We apply industry-standard security measures to protect your personal data.
                All reminders and medicine details remain private and are not sold or shared
                with unauthorized third parties.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Services</h2>
            <p className="mb-4">
                While <strong>Medics</strong> does not sell, trade, or rent your information,
                we may use trusted third-party providers (e.g., cloud hosting or analytics).
                These providers comply with strict privacy and security standards.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
            <p className="mb-4">
                You may access, update, or delete your data at any time. Uninstalling the app
                will remove all locally stored data from your device.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Updates to This Policy</h2>
            <p className="mb-4">
                We may revise this Privacy Policy periodically. Updates will be posted here
                with the revision date indicated below.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
            <p className="mb-4">
                For any questions or concerns regarding this Privacy Policy, please contact us at:{" "}
                <strong>support@techorbitals.in</strong>
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Consent & Jurisdiction</h2>
            <p className="mb-4">
                By using <strong>Medics</strong>, you consent to this Privacy Policy.
                This Policy is governed by the laws of India, without regard to its
                conflict of law provisions.
            </p>

            <p className="mt-8 text-sm text-gray-500">
                Last Updated: {new Date().toLocaleDateString()}
            </p>
        </div>
    );
};

export default PrivacyPolicy;
