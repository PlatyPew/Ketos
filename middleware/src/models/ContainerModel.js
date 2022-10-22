const mongoose = require("mongoose");

const ContainerInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        Id: { type: "String" },
        Created: { type: "Date" },
        Path: { type: "String" },
        Args: { type: ["String"] },
        State: {
            Status: { type: "String" },
            Running: { type: "Boolean" },
            Paused: { type: "Boolean" },
            Restarting: { type: "Boolean" },
            OOMKilled: { type: "Boolean" },
            Dead: { type: "Boolean" },
            Pid: { type: "Number" },
            ExitCode: { type: "Number" },
            Error: { type: "String" },
            StartedAt: { type: "Date" },
            FinishedAt: { type: "Date" },
        },
        Image: { type: "String" },
        ResolvConfPath: { type: "String" },
        HostnamePath: { type: "String" },
        HostsPath: { type: "String" },
        LogPath: { type: "String" },
        Name: { type: "String" },
        RestartCount: { type: "Number" },
        Driver: { type: "String" },
        Platform: { type: "String" },
        MountLabel: { type: "String" },
        ProcessLabel: { type: "String" },
        AppArmorProfile: { type: "String" },
        ExecIDs: { type: "Mixed" },
        HostConfig: {
            Binds: { type: "Array" },
            ContainerIDFile: { type: "String" },
            LogConfig: { Type: { type: "String" }, Config: { type: "Object" } },
            NetworkMode: { type: "String" },
            PortBindings: { type: "Object" },
            RestartPolicy: { Name: { type: "String" }, MaximumRetryCount: { type: "Number" } },
            AutoRemove: { type: "Boolean" },
            VolumeDriver: { type: "String" },
            VolumesFrom: { type: "Mixed" },
            CapAdd: { type: "Mixed" },
            CapDrop: { type: ["String"] },
            CgroupnsMode: { type: "String" },
            Dns: { type: "Array" },
            DnsOptions: { type: "Array" },
            DnsSearch: { type: "Array" },
            ExtraHosts: { type: "Array" },
            GroupAdd: { type: "Mixed" },
            IpcMode: { type: "String" },
            Cgroup: { type: "String" },
            Links: { type: "Mixed" },
            OomScoreAdj: { type: "Number" },
            PidMode: { type: "String" },
            Privileged: { type: "Boolean" },
            PublishAllPorts: { type: "Boolean" },
            ReadonlyRootfs: { type: "Boolean" },
            SecurityOpt: { type: "Mixed" },
            Tmpfs: { type: "Object" },
            UTSMode: { type: "String" },
            UsernsMode: { type: "String" },
            ShmSize: { type: "Number" },
            Runtime: { type: "String" },
            ConsoleSize: { type: ["Number"] },
            Isolation: { type: "String" },
            CpuShares: { type: "Number" },
            Memory: { type: "Number" },
            NanoCpus: { type: "Number" },
            CgroupParent: { type: "String" },
            BlkioWeight: { type: "Number" },
            BlkioWeightDevice: { type: "Mixed" },
            BlkioDeviceReadBps: { type: "Mixed" },
            BlkioDeviceWriteBps: { type: "Mixed" },
            BlkioDeviceReadIOps: { type: "Mixed" },
            BlkioDeviceWriteIOps: { type: "Mixed" },
            CpuPeriod: { type: "Number" },
            CpuQuota: { type: "Number" },
            CpuRealtimePeriod: { type: "Number" },
            CpuRealtimeRuntime: { type: "Number" },
            CpusetCpus: { type: "String" },
            CpusetMems: { type: "String" },
            Devices: { type: "Mixed" },
            DeviceCgroupRules: { type: "Mixed" },
            DeviceRequests: { type: "Mixed" },
            KernelMemory: { type: "Number" },
            KernelMemoryTCP: { type: "Number" },
            MemoryReservation: { type: "Number" },
            MemorySwap: { type: "Number" },
            MemorySwappiness: { type: "Mixed" },
            OomKillDisable: { type: "Mixed" },
            PidsLimit: { type: "Number" },
            Ulimits: { type: ["Mixed"] },
            CpuCount: { type: "Number" },
            CpuPercent: { type: "Number" },
            IOMaximumIOps: { type: "Number" },
            IOMaximumBandwidth: { type: "Number" },
            MaskedPaths: { type: ["String"] },
            ReadonlyPaths: { type: ["String"] },
        },
        GraphDriver: {
            Data: {
                LowerDir: { type: "String" },
                MergedDir: { type: "String" },
                UpperDir: { type: "String" },
                WorkDir: { type: "String" },
            },
            Name: { type: "String" },
        },
        Mounts: { type: "Array" },
        Config: {
            Hostname: { type: "String" },
            Domainname: { type: "String" },
            User: { type: "String" },
            AttachStdin: { type: "Boolean" },
            AttachStdout: { type: "Boolean" },
            AttachStderr: { type: "Boolean" },
            ExposedPorts: { type: "Object" },
            Tty: { type: "Boolean" },
            OpenStdin: { type: "Boolean" },
            StdinOnce: { type: "Boolean" },
            Env: { type: ["String"] },
            Cmd: { type: ["String"] },
            Image: { type: "String" },
            Volumes: { type: "Mixed" },
            WorkingDir: { type: "String" },
            Entrypoint: { type: ["String"] },
            OnBuild: { type: "Mixed" },
            StopSignal: { type: "String" },
        },
        NetworkSettings: {
            Bridge: { type: "String" },
            SandboxID: { type: "String" },
            HairpinMode: { type: "Boolean" },
            LinkLocalIPv6Address: { type: "String" },
            LinkLocalIPv6PrefixLen: { type: "Number" },
            Ports: { type: "Object" },
            SandboxKey: { type: "String" },
            SecondaryIPAddresses: { type: "Mixed" },
            SecondaryIPv6Addresses: { type: "Mixed" },
            EndpointID: { type: "String" },
            Gateway: { type: "String" },
            GlobalIPv6Address: { type: "String" },
            GlobalIPv6PrefixLen: { type: "Number" },
            IPAddress: { type: "String" },
            IPPrefixLen: { type: "Number" },
            IPv6Gateway: { type: "String" },
            MacAddress: { type: "String" },
            Networks: { type: "Object" },
        },
    },
    { _id: false, collection: "container_info", versionKey: false }
);

const DiffInfoSchema = new mongoose.Schema(
    {
        _id: { type: "String" },
        diff: {
            Add: {
                type: ["String"],
            },
            Edit: {
                type: ["String"],
            },
            Delete: {
                type: "Array",
            },
        },
    },
    { _id: false, collection: "diff_info", versionKey: false }
);

module.exports = {
    ContainerInfoModel: mongoose.model("ContainerInfoModel", ContainerInfoSchema),
    DiffInfoModel: mongoose.model("DiffInfoModel", DiffInfoSchema),
};
