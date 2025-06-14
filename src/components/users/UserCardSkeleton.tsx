import React from "react";
import { Card, Skeleton, Grid } from "antd";

const { useBreakpoint } = Grid;

const UserCardSkeleton: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  return (
    <Card
      hoverable
      className="relative user-card"
      bodyStyle={{ padding: "2rem", textAlign: "center" }}
    >      

      <div className="flex flex-col items-center gap-3">
        {/* Avatar */}
        <Skeleton.Avatar active size={64} shape="circle" />

        {/* Name */}
        <Skeleton.Input
          active
          size="default"
          style={{ width: "80%", marginTop: 8 }}
        />

        {/* Email */}
        <Skeleton.Input
          active
          size="small"
          style={{ width: "60%", marginTop: 4 }}
        />
      </div>

      {/* Bottom buttons for mobile */}
      {isMobile && (
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Skeleton.Button active size="default" style={{ width: 80 }} />
          <Skeleton.Button active size="default" style={{ width: 80 }} />
        </div>
      )}
    </Card>
  );
};

export default UserCardSkeleton;

