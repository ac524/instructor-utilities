import 	{ Tabs } from "react-bulma-components";
const { Tab } = Tabs;

const StudentModalTabs = ({ setTabs, selectedTab, listOfTabs }) => {
	return (
		<Tabs centered="centered">
			{listOfTabs.map((tabs, index) => (
				<Tab
                    key={index}
					onClick={() => setTabs(tabs)}
					className={selectedTab === tabs ? "is-active" : ""}>
					{tabs}
				</Tab>
			))}
		</Tabs>
	);
};

export default StudentModalTabs