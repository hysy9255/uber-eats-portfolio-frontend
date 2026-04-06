import { Fragment } from "react";
import ClientSidebarTab from "./Tabs/ClientSidebarTab";
import { clientSidebarTabs } from "../../constants/ClientSidebarConfigs";
import { useNavigate } from "react-router-dom";
import { useClientSideBar } from "../../ReactContext/clientSideBar/UseClientSideBar";
import SideBarShell from "../Shells/SideBarShell";

interface ClientSideBarProps {
  className?: string;
  sideBarWidth: string;
}

const ClientSideBar: React.FC<ClientSideBarProps> = ({
  className,
  sideBarWidth,
}) => {
  const navigate = useNavigate();
  const { selectedTab, expandedKey, setExpandedKey } = useClientSideBar();

  return (
    <SideBarShell className={className} sideBarWidth={sideBarWidth}>
      <div>
        {clientSidebarTabs.map((tab, index) => {
          if (tab.kind === "item") {
            return (
              <ClientSidebarTab
                key={index}
                title={tab.title}
                icon={tab.icon}
                handleOnClick={() => {
                  navigate(tab.path);
                }}
                tabType={tab.key}
                selectedTab={selectedTab}
              />
            );
          } else if (tab.kind === "group") {
            return (
              <Fragment key={index}>
                <ClientSidebarTab
                  title={tab.title}
                  icon={tab.icon}
                  handleOnClick={() =>
                    setExpandedKey((prev) =>
                      prev === tab.key ? null : tab.key
                    )
                  }
                />
                {expandedKey === tab.key &&
                  tab.children.map((innerTab, innerIndex) => (
                    <ClientSidebarTab
                      key={innerIndex}
                      title={innerTab.title}
                      handleOnClick={() => {
                        if (innerTab.kind === "item") {
                          navigate(innerTab.path);
                        }
                      }}
                      tabType={
                        innerTab.kind === "item" ? innerTab.key : undefined
                      }
                      selectedTab={selectedTab}
                      extraPaddingOnLeft={true}
                    />
                  ))}
              </Fragment>
            );
          }
        })}
      </div>
    </SideBarShell>
  );
};

export default ClientSideBar;
