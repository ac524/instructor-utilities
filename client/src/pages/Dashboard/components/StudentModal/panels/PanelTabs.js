import 	{ Tabs } from "react-bulma-components";

const { Tab } = Tabs;

export const PanelTabs = ({ activePanel, setPanel, panels }) => {
	return (
		<Tabs centered="centered">
			{[...panels].map(([key, {label}]) => (
				<Tab
                    key={key}
					onClick={() => setPanel(key)}
					className={activePanel === key ? "is-active" : ""}>
					{label}
				</Tab>
			))}
		</Tabs>
	);
};